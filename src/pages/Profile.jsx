import { useEffect, useRef, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext.jsx';

// Avatar upload constraints and bucket config
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const AVATAR_BUCKET = 'avatars';
const avatarPath = (uid) => `${uid}/avatar`;

// Get initials for avatar fallback
function getInitials(nameOrEmail) {
	const s = (nameOrEmail || '').trim();
	if (!s) return 'U';
	if (s.includes('@')) return s[0]?.toUpperCase() || 'U';
	const parts = s.split(' ').filter(Boolean);
	if (parts.length === 1) return parts[0][0]?.toUpperCase() || 'U';
	return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Avatar component: displays image or initials fallback
function Avatar({ url, fallback, size = 80 }) {
	if (url) {
		return (
			<img
				src={url}
				alt="Avatar"
				className="rounded-full object-cover ring-1 ring-gray-200"
				style={{ width: size, height: size }}
			/>
		);
	}
	return (
		<div
			className="flex items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-700 ring-1 ring-gray-200"
			style={{ width: size, height: size }}
		>
			{getInitials(fallback)}
		</div>
	);
}

// Clean input values (null/empty to null)
function clean(v) {
	if (v == null) return null;
	const t = String(v).trim();
	return t === '' ? null : t;
}

// Main Profile page component
export default function Profile() {
	// Auth context and mount ref
	const { user, loading: authLoading } = useAuth();
	const mountedRef = useRef(false);

	// Profile data and loading/error states
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Save state (success/error/loading)
	const [saveError, setSaveError] = useState(null);
	const [saveOk, setSaveOk] = useState(null);
	const [saving, setSaving] = useState(false);

	// Username check states
	const [checkingUsername, setCheckingUsername] = useState(false);
	const [usernameTaken, setUsernameTaken] = useState(false);

	// Avatar upload UI states
	const [avatarFile, setAvatarFile] = useState(null);
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [avatarError, setAvatarError] = useState(null);
	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const [removeExistingAvatar, setRemoveExistingAvatar] = useState(false);

	// Avatar public URL and cache-busting version
	const [avatarPublicUrl, setAvatarPublicUrl] = useState(null);
	const [avatarVersion, setAvatarVersion] = useState(0);

	// React Hook Form setup
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { isSubmitting },
	} = useForm({
		mode: 'onBlur',
		defaultValues: { full_name: '', username: '', bio: '' },
	});

	// Load profile (+ cache)
	useEffect(() => {
		mountedRef.current = true;
		const load = async () => {
			if (!user) {
				setProfile(null);
				setLoading(false);
				return;
			}
			const cacheKey = `profile:${user.id}`;
			let hadCache = false;
			try {
				const cached = sessionStorage.getItem(cacheKey);
				if (cached) {
					const parsed = JSON.parse(cached);
					setProfile(parsed);
					setLoading(false);
					hadCache = true;
				}
			} catch {
				// ignore cache read errors
			}

			if (!hadCache) setLoading(true);

			const { data, error: selErr } = await supabase
				.from('profiles')
				.select('id,email,full_name,username,bio,updated_at') // avatar_url column removed
				.eq('id', user.id)
				.maybeSingle();

			if (selErr) {
				if (mountedRef.current) {
					setError(selErr.message || 'Failed to load profile');
					setLoading(false);
				}
				return;
			}

			const fallback = data || {
				id: user.id,
				email: user.email ?? null,
				full_name:
					user.user_metadata?.full_name ||
					user.user_metadata?.name ||
					(user.email && user.email.includes('@')
						? user.email.split('@')[0]
						: null),
				username:
					user.user_metadata?.username || user.user_metadata?.user_name || null,
				bio: null,
				updated_at: new Date().toISOString(),
			};

			if (mountedRef.current) {
				setProfile(fallback);
				setLoading(false);
				try {
					sessionStorage.setItem(cacheKey, JSON.stringify(fallback));
				} catch {
					// ignore cache write errors
				}
			}
		};
		load();
		return () => {
			mountedRef.current = false;
		};
	}, [user]);

	// Sync form with loaded profile
	useEffect(() => {
		if (!profile) return;
		const email = profile.email || user?.email || '';
		reset({
			full_name:
				profile.full_name ||
				user?.user_metadata?.full_name ||
				user?.user_metadata?.name ||
				(email.includes('@') ? email.split('@')[0] : ''),
			username: profile.username || '',
			bio: profile.bio || '',
		});
	}, [profile, reset, user]);

	// Get public avatar URL from Storage
	const refreshAvatarUrl = useCallback(async () => {
		if (!user) return;
		// Check if the avatar file exists in the bucket
		const { data: list, error } = await supabase.storage
			.from(AVATAR_BUCKET)
			.list(user.id, { limit: 100 });
		if (error) {
			return;
		}
		const files = Array.isArray(list) ? list : [];
		const exact = files.find((f) => f?.name === 'avatar');
		const withExt = files.find((f) => f?.name?.startsWith?.('avatar.'));
		const picked = exact || withExt || null;
		if (!picked) {
			setAvatarPublicUrl(null);
			return;
		}
		const path = `${user.id}/${picked.name}`;
		const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
		const baseUrl = data?.publicUrl || null;
		setAvatarPublicUrl(
			baseUrl
				? `${baseUrl}${avatarVersion ? `?v=${avatarVersion}` : ''}`
				: null,
		);
	}, [user, avatarVersion]);

	// Refresh avatar URL on changes
	useEffect(() => {
		if (user && !removeExistingAvatar) {
			// don't wait; URL update will run asynchronously
			void refreshAvatarUrl();
		}
		if (removeExistingAvatar) setAvatarPublicUrl(null);
	}, [user, profile?.updated_at, removeExistingAvatar, refreshAvatarUrl]);

	// Cleanup avatar preview object URL
	useEffect(
		() => () => {
			if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		},
		[avatarPreview],
	);

	// Derived display values
	const email = profile?.email ?? user?.email ?? '—';
	const displayName =
		profile?.full_name ||
		user?.user_metadata?.name ||
		(email.includes('@') ? email.split('@')[0] : '—');
	const updatedAt = profile?.updated_at
		? new Date(profile.updated_at).toLocaleString()
		: '—';
	// Current avatar URL comes from Storage, not the DB profile field
	const currentAvatarUrl = removeExistingAvatar ? null : avatarPublicUrl;

	// Username uniqueness check
	const handleUsernameBlur = useCallback(
		async (raw) => {
			const uname = (raw || '').trim();
			if (!uname) {
				setUsernameTaken(false);
				return;
			}
			if (!/^[a-z0-9]{3,20}$/.test(uname)) {
				setUsernameTaken(false);
				return;
			}
			if (!user) return;
			setCheckingUsername(true);
			try {
				const { count, error: cErr } = await supabase
					.from('profiles')
					.select('*', { head: true, count: 'exact' })
					.eq('username', uname)
					.neq('id', user.id);
				if (cErr) return;
				setUsernameTaken((count ?? 0) > 0);
			} finally {
				setCheckingUsername(false);
			}
		},
		[user],
	);

	// Avatar file input change handler
	function onAvatarChange(e) {
		const file = e.target.files?.[0];
		setAvatarError(null);
		setRemoveExistingAvatar(false);
		if (!file) {
			setAvatarFile(null);
			if (avatarPreview) URL.revokeObjectURL(avatarPreview);
			setAvatarPreview(null);
			return;
		}
		if (!ALLOWED_TYPES.includes(file.type)) {
			setAvatarFile(null);
			setAvatarError('Only JPEG, PNG, WEBP are allowed');
			return;
		}
		if (file.size > MAX_SIZE) {
			setAvatarFile(null);
			setAvatarError('Max size is 2MB');
			return;
		}
		if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		setAvatarFile(file);
		setAvatarPreview(URL.createObjectURL(file));
	}

	// Remove selected avatar file from the UI state
	function removeSelectedAvatar() {
		setAvatarFile(null);
		if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		setAvatarPreview(null);
	}

	// Mark to remove existing avatar from Storage on save
	function markRemoveExisting() {
		removeSelectedAvatar();
		setRemoveExistingAvatar(true);
	}

	// Sync avatar file in Storage (upload/remove)
	async function syncAvatarIfNeeded() {
		if (!user) return { changed: false, url: currentAvatarUrl };
		// Deleting current avatar
		if (removeExistingAvatar) {
			setUploadingAvatar(true);
			try {
				// List files under {uid} and delete avatar / avatar.*
				const { data: list, error: listErr } = await supabase.storage
					.from(AVATAR_BUCKET)
					.list(user.id, { limit: 100 });
				if (listErr) {
					// If listing fails, attempt to remove the base key
					await supabase.storage
						.from(AVATAR_BUCKET)
						.remove([avatarPath(user.id)]);
				} else {
					const toRemove = (list || [])
						.filter(
							(f) => f && (f.name === 'avatar' || f.name.startsWith('avatar.')),
						)
						.map((f) => `${user.id}/${f.name}`);
					if (toRemove.length === 0) {
						// Also try removing the key without extension as a fallback
						toRemove.push(avatarPath(user.id));
					}
					const { error: delErr } = await supabase.storage
						.from(AVATAR_BUCKET)
						.remove(toRemove);
					if (delErr) {
						setAvatarError(delErr.message || 'Avatar delete failed');
						return { changed: false, url: currentAvatarUrl };
					}
				}
				setAvatarVersion(Date.now());
				setAvatarPublicUrl(null);
				return { changed: true, url: null };
			} finally {
				setUploadingAvatar(false);
			}
		}

		// Upload a new avatar file
		if (avatarFile) {
			setUploadingAvatar(true);
			try {
				const { error: upErr } = await supabase.storage
					.from(AVATAR_BUCKET)
					.upload(avatarPath(user.id), avatarFile, {
						upsert: true,
						contentType: avatarFile.type,
						cacheControl: '3600',
					});
				if (upErr) {
					setAvatarError(upErr.message || 'Avatar upload failed');
					return { changed: false, url: currentAvatarUrl };
				}
				const { data } = supabase.storage
					.from(AVATAR_BUCKET)
					.getPublicUrl(avatarPath(user.id));
				const url = data?.publicUrl || null;
				setAvatarVersion(Date.now());
				setAvatarPublicUrl(url ? `${url}?v=${Date.now()}` : null);
				return { changed: true, url };
			} finally {
				setUploadingAvatar(false);
			}
		}

		return { changed: false, url: currentAvatarUrl };
	}

	// Save profile handler
	async function onSubmit(formData) {
		if (!user) return;
		setSaveError(null);
		setSaveOk(null);
		setSaving(true);

		const uname = (formData.username || '').trim();

		// Validations
		if (uname && !/^[a-z0-9]{3,20}$/.test(uname)) {
			setSaveError('Username: lowercase letters and digits only, 3–20 chars.');
			setSaving(false);
			return;
		}
		if (usernameTaken && uname !== profile?.username) {
			setSaveError('Username is already taken.');
			setSaving(false);
			return;
		}
		if (formData.full_name && formData.full_name.trim().length < 2) {
			setSaveError('Full name: min 2 characters.');
			setSaving(false);
			return;
		}
		if (formData.bio && formData.bio.length > 500) {
			setSaveError('Bio: max 500 characters.');
			setSaving(false);
			return;
		}

		// File synchronization (upload/delete)
		const { changed: avatarChanged } = await syncAvatarIfNeeded();
		if (avatarError) {
			setSaving(false);
			return;
		}

		// Prepare changes (no longer writing avatar_url)
		const next = {
			full_name: clean(formData.full_name),
			username: clean(uname),
			bio: clean(formData.bio),
		};
		const prev = {
			full_name: profile?.full_name ?? null,
			username: profile?.username ?? null,
			bio: profile?.bio ?? null,
		};
		const delta = {};
		for (const k of Object.keys(next)) {
			const nv = next[k];
			if (nv === '' || nv == null) {
				if (prev[k] !== null && prev[k] !== undefined && nv === null)
					delta[k] = null;
			} else if (nv !== prev[k]) {
				delta[k] = nv;
			}
		}

		if (Object.keys(delta).length === 0 && !avatarChanged) {
			setSaveOk('No changes.');
			setSaving(false);
			return;
		}

		const payload = {
			id: user.id,
			...delta,
			updated_at: new Date().toISOString(),
		};

		const { data: saved, error: upsertErr } = await supabase
			.from('profiles')
			.upsert(payload)
			.select()
			.maybeSingle();

		if (upsertErr) {
			if (upsertErr.code === '23505') {
				setSaveError('Username is already taken.');
				setUsernameTaken(true);
			} else {
				setSaveError(upsertErr.message || 'Save error');
			}
			setSaving(false);
			return;
		}

		// Update local state and session cache
		if (saved) {
			setProfile(saved);
			try {
				sessionStorage.setItem(`profile:${user.id}`, JSON.stringify(saved));
			} catch {
				/* ignore */
			}
		} else {
			const merged = { ...profile, ...delta, updated_at: payload.updated_at };
			setProfile(merged);
			try {
				sessionStorage.setItem(`profile:${user.id}`, JSON.stringify(merged));
			} catch {
				/* ignore */
			}
		}

		setSaveOk('Profile saved.');
		setSaving(false);
		setRemoveExistingAvatar(false);
		removeSelectedAvatar();
		setAvatarVersion((v) => v + 1);
		void refreshAvatarUrl();
	}

	// Loading/auth/error render branches
	if (authLoading || loading) {
		return (
			<section className="bg-gray-50 py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
						Loading…
					</div>
				</div>
			</section>
		);
	}

	if (!user) {
		return (
			<section className="bg-gray-50 py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-800">
						Not authorized
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="bg-gray-50 py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
						{error}
					</div>
				</div>
			</section>
		);
	}

	// Main profile form
	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
					<div className="flex items-start gap-4">
						<Avatar
							url={avatarPreview || currentAvatarUrl}
							fallback={displayName || email}
						/>
						<div className="min-w-0 flex-1">
							<h1 className="text-2xl font-semibold break-words text-gray-900">
								{displayName}
							</h1>
							<p className="mt-1 text-sm break-all text-gray-500">{email}</p>
						</div>
					</div>

					<dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-lg border border-gray-100 p-4">
							<dt className="text-xs tracking-wide text-gray-500 uppercase">
								Email
							</dt>
							<dd className="mt-1 break-all text-gray-900">{email}</dd>
						</div>
						<div className="rounded-lg border border-gray-100 p-4">
							<dt className="text-xs tracking-wide text-gray-500 uppercase">
								Updated
							</dt>
							<dd className="mt-1 text-gray-900">{updatedAt}</dd>
						</div>
						<div className="rounded-lg border border-gray-100 p-4">
							<dt className="text-xs tracking-wide text-gray-500 uppercase">
								Username
							</dt>
							<dd className="mt-1 text-gray-900">{profile?.username || '—'}</dd>
						</div>
					</dl>

					<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
						{saveError && (
							<div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
								{saveError}
							</div>
						)}
						{saveOk && (
							<div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
								{saveOk}
							</div>
						)}

						{/* Full name */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Full name
							</label>
							<input
								type="text"
								{...register('full_name')}
								minLength={2}
								className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
								placeholder="Ada Lovelace"
							/>
						</div>

						{/* Username */}
						<div>
							<label className="text sm block font-medium text-gray-700">
								Username
							</label>
							<input
								type="text"
								value={watch('username') || ''}
								onChange={(e) => {
									const cleaned = e.target.value
										.toLowerCase()
										.replace(/[^a-z0-9]/g, '');
									setValue('username', cleaned, { shouldDirty: true });
									if (saveError === 'Username is already taken.')
										setSaveError(null);
								}}
								onBlur={(e) => handleUsernameBlur(e.target.value)}
								className={`mt-1 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
									usernameTaken ? 'border-red-400' : 'border-gray-300'
								}`}
								placeholder="adalovelace"
							/>
							{checkingUsername && (
								<p className="mt-1 text-xs text-gray-500">Checking username…</p>
							)}
							{!checkingUsername && usernameTaken && (
								<p className="mt-1 text-xs text-red-600">
									Username is already taken.
								</p>
							)}
							{!checkingUsername && !usernameTaken && (
								<p className="mt-1 text-xs text-gray-500">
									Lowercase letters and digits only, 3–20 characters.
								</p>
							)}
						</div>

						{/* Bio */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Bio
							</label>
							<textarea
								{...register('bio')}
								className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
								placeholder="About you... (up to 500 characters)"
								maxLength={500}
								rows={4}
							/>
							<p className="mt-1 text-xs text-gray-500">{`${(watch('bio') || '').length}/500`}</p>
						</div>

						{/* Avatar upload */}
						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								Avatar
							</label>
							<div className="mt-2 flex flex-col gap-3">
								<div className="flex flex-wrap items-center gap-4">
									<div>
										<Avatar
											url={avatarPreview || currentAvatarUrl}
											fallback={displayName || email}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<input
											type="file"
											accept={ALLOWED_TYPES.join(',')}
											onChange={onAvatarChange}
											className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700"
											disabled={uploadingAvatar || saving || isSubmitting}
										/>
										<div className="flex flex-wrap gap-2">
											{avatarFile && (
												<button
													type="button"
													onClick={removeSelectedAvatar}
													className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
													disabled={uploadingAvatar}
												>
													Remove selected
												</button>
											)}
											{currentAvatarUrl &&
												!avatarFile &&
												!removeExistingAvatar && (
													<button
														type="button"
														onClick={markRemoveExisting}
														className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
														disabled={uploadingAvatar}
													>
														Remove current
													</button>
												)}
											{removeExistingAvatar && (
												<span className="text-sm text-red-600">
													Current avatar will be removed
												</span>
											)}
										</div>
										<p className="text-xs text-gray-500">
											JPEG / PNG / WEBP, up to 2MB.
										</p>
										{avatarError && (
											<p className="text-sm text-red-600">{avatarError}</p>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between pt-2">
							<p className="text-xs text-gray-500">
								Click Save to apply changes.
							</p>
							<button
								type="submit"
								disabled={saving || isSubmitting || uploadingAvatar}
								className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
							>
								{saving || isSubmitting ? 'Saving…' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

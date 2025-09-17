import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

function clearProfileCacheAll() {
	try {
		const keys = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const k = sessionStorage.key(i);
			if (!k) continue;
			if (k.startsWith('profile:') || k.startsWith('avatar:')) keys.push(k);
		}
		keys.forEach((k) => sessionStorage.removeItem(k));
	} catch (e) {
		void e;
	}
}

async function ensureProfile(u) {
	if (!u) return;
	// Ищем существующий профиль (без avatar_url)
	const { data: existing, error: selErr } = await supabase
		.from('profiles')
		.select('id,email,full_name,username,bio')
		.eq('id', u.id)
		.maybeSingle();
	if (selErr) return;

	// Значения из метаданных пользователя; undefined означает "не трогать поле"
	const metaFullName =
		u.user_metadata?.full_name ?? u.user_metadata?.name ?? undefined;
	const metaUsername =
		u.user_metadata?.user_name ?? u.user_metadata?.username ?? undefined;
	const email = u.email ?? undefined;

	if (!existing) {
		// Вставляем новую запись, null допустимы при отсутствии значений
		const payload = {
			id: u.id,
			email: u.email ?? null,
			full_name: metaFullName ?? null,
			username: metaUsername ?? null,
			bio: null,
			updated_at: new Date().toISOString(),
		};
		await supabase.from('profiles').insert(payload);
		return;
	}

	// Обновляем только реально заданные и нужные значения
	const delta = {};
	// email синхронизируем всегда, если поменялся
	if (email && email !== existing.email) delta.email = email;
	// Остальные поля: заполняем только если в профиле пусто
	if (
		(existing.full_name == null || existing.full_name === '') &&
		metaFullName
	) {
		delta.full_name = metaFullName;
	}
	if ((existing.username == null || existing.username === '') && metaUsername) {
		delta.username = metaUsername;
	}
	// bio не трогаем здесь

	if (Object.keys(delta).length > 0) {
		delta.updated_at = new Date().toISOString();
		await supabase.from('profiles').update(delta).eq('id', u.id);
	}
}

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let subscription;
		(async () => {
			const { data } = await supabase.auth.getSession();
			setSession(data.session ?? null);
			setUser(data.session?.user ?? null);
			if (data.session?.user) await ensureProfile(data.session.user);
			setLoading(false);

			subscription = supabase.auth.onAuthStateChange(
				async (event, _session) => {
					setSession(_session ?? null);
					setUser(_session?.user ?? null);
					// Обновляем профиль только при входе или обновлении пользователя
					if (
						(event === 'SIGNED_IN' || event === 'USER_UPDATED') &&
						_session?.user
					) {
						await ensureProfile(_session.user);
					}
					if (event === 'SIGNED_OUT') {
						clearProfileCacheAll();
					}
				},
			).data.subscription;
		})();

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	const value = useMemo(
		() => ({
			session,
			user,
			loading,
			signOut: async () => {
				clearProfileCacheAll();
				await supabase.auth.signOut();
			},
		}),
		[session, user, loading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

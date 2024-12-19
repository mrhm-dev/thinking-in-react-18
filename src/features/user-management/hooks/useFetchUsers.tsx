import { useCallback, useContext, useEffect, useState } from 'react';
import { UserAPI } from '@/apis/UserAPI';
import { UserContext } from '../UserProvider';

export const useFetchUsers = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { state, dispatch } = useContext(UserContext);

	const { page, pageSize, filter, sort } = state;

	const fetchUsers = useCallback(async () => {
		try {
			setIsLoading(true);
			const params = {
				page,
				pageSize,
				...filter,
				sortBy: sort.column,
				sortDirection: sort.direction,
			};

			const result = await UserAPI.get(params);
			dispatch({
				type: 'SET_STATE',
				payload: {
					users: result.users,
					totalPages: result.totalPages,
					totalUsers: result.totalUsers,
					page: result.page,
					pageSize: result.pageSize,
					filter,
					sort,
				},
			});
			setError(null);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	}, [dispatch, filter, page, pageSize, sort]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers, page, pageSize, filter, sort]);

	return { isLoading, error, refetch: fetchUsers };
};

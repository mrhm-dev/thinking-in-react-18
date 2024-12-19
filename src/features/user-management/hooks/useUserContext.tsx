import { useCallback, useContext, useMemo } from 'react';
import { UserContext } from '../UserProvider';
import { SortColumn, SortDirection, State } from '../types';

export const useUserContext = () => {
	const { state, dispatch } = useContext(UserContext);

	const users = useMemo(() => {
		return state.users;
	}, [state.users]);

	const pagination = useMemo(() => {
		return {
			page: state.page,
			pageSize: state.pageSize,
			totalPage: state.totalPages,
			totalUsers: state.totalUsers,
		};
	}, [state.page, state.pageSize, state.totalPages, state.totalUsers]);

	const filter = useMemo(() => {
		return state.filter;
	}, [state.filter]);

	const sort = useMemo(() => {
		return state.sort;
	}, [state.sort]);

	const updateFilter = useCallback(
		(filter: State['filter']) => {
			dispatch({
				type: 'UPDATE_STATE',
				payload: { filter: { ...state.filter, ...filter } },
			});
		},
		[dispatch, state.filter]
	);

	const updateSort = useCallback(
		({
			column,
			direction,
		}: {
			column?: SortColumn;
			direction?: SortDirection;
		}) => {
			dispatch({
				type: 'UPDATE_STATE',
				payload: {
					sort: {
						...state.sort,
						...(column && { column }),
						...(direction && { direction }),
					},
				},
			});
		},
		[dispatch, state.sort]
	);

	const updatePage = useCallback(
		(page: number) => {
			dispatch({ type: 'UPDATE_STATE', payload: { page } });
		},
		[dispatch]
	);

	const updatePageSize = useCallback(
		(pageSize: number) => {
			dispatch({ type: 'UPDATE_STATE', payload: { pageSize } });
		},
		[dispatch]
	);

	const updateSearch = useCallback(
		(query: string) => {
			dispatch({
				type: 'UPDATE_STATE',
				payload: {
					filter: {
						...state.filter,
						query,
					},
				},
			});
		},
		[dispatch, state.filter]
	);

	const resetFilter = useCallback(() => {
		dispatch({ type: 'RESET' });
	}, [dispatch]);

	return {
		users,
		pagination,
		filter,
		sort,
		updateFilter,
		updateSort,
		updatePage,
		updatePageSize,
		updateSearch,
		resetFilter,
	};
};

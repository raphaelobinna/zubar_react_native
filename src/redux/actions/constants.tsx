import store from "../store"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

type Action = {
    type: string
    payLoad?: any
}

export type DispatchType = (args: Action) => Action

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
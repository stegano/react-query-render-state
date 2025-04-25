import { useInfiniteQuery, UseInfiniteQueryResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRenderState, IRenderState } from "react-render-state";
export { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/**
 * useConvertQueryRenderStateResult
 * Convert the ReactQuery result to ReactRenderState result.
 */
export declare const useConvertQueryRenderStateResult: <QueryData, QueryError extends Error, QueryResult extends UseQueryResult<QueryData, QueryError> | UseInfiniteQueryResult<QueryData, QueryError>>(reactQueryResult: QueryResult) => {
    render: IRenderState.Render<QueryData, QueryError>;
} & QueryResult;
/**
 * useQueryRenderState
 */
export declare const useQueryRenderState: <QueryFnData, QueryError extends Error, QueryData>(...args: Parameters<typeof useQuery<QueryFnData, QueryError, QueryData>>) => {
    render: IRenderState.Render<unknown, Error>;
} & UseQueryResult<QueryData, QueryError>;
/**
 * useInfiniteQueryRenderState
 */
export declare const useInfiniteQueryRenderState: <QueryFnData, QueryError extends Error, QueryData>(...args: Parameters<typeof useInfiniteQuery<QueryFnData, QueryError, QueryData>>) => ReturnType<typeof useInfiniteQuery<QueryFnData, QueryError, QueryData>> & {
    render: ReturnType<typeof useRenderState<QueryData, QueryError>>[0];
};

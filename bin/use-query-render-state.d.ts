import { useInfiniteQuery, UseInfiniteQueryResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRenderState, IRenderState } from "react-render-state";
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
export declare const useQueryRenderState: <QueryFnData, QueryError extends Error, QueryData>(...args: Parameters<typeof useQuery<QueryFnData, QueryError, QueryData>>) => ReturnType<typeof useQuery<QueryFnData, QueryError, QueryData>> & {
    render: ReturnType<typeof useRenderState<QueryData, QueryError>>[0];
};
/**
 * useInfiniteQueryRenderState
 */
export declare const useInfiniteQueryRenderState: <QueryFnData, QueryError extends Error, QueryData>(...args: Parameters<typeof useInfiniteQuery<QueryFnData, QueryError, QueryData>>) => ReturnType<typeof useInfiniteQuery<QueryFnData, QueryError, QueryData>> & {
    render: ReturnType<typeof useRenderState<QueryData, QueryError>>[0];
};

import { QueryObserverBaseResult, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRenderState, IRenderState } from "react-render-state";

/**
 * useConvertQueryRenderStateResult
 * Convert the ReactQuery result to ReactRenderState result.
 */
export const useConvertQueryRenderStateResult = <
  QueryData,
  QueryError extends Error,
  QueryResult extends QueryObserverBaseResult<QueryData, QueryError>,
>(
  reactQueryResult: QueryResult,
) => {
  const [render, , , , , , , , manipulation] = useRenderState<QueryData, QueryError>();

  /**
   * handle the `react-query` status
   */
  useEffect(() => {
    const { isFetching, isRefetching, isSuccess, isError } = reactQueryResult;
    const isPending = isFetching || isRefetching;
    if (isPending) {
      manipulation((prev) => ({
        previousData: prev.currentData,
        previousError: prev.currentError,
        currentData: undefined,
        currentError: undefined,
        status: IRenderState.Status.Loading,
      }));
    } else if (isSuccess) {
      manipulation((prev) => ({
        previousData: prev.currentData,
        previousError: prev.currentError,
        currentData: reactQueryResult.data,
        currentError: undefined,
        status: IRenderState.Status.Success,
      }));
    } else if (isError) {
      manipulation((prev) => ({
        previousData: prev.currentData,
        previousError: prev.currentError,
        currentData: undefined,
        currentError: reactQueryResult.error ?? undefined,
        status: IRenderState.Status.Error,
      }));
    }
  }, [manipulation, reactQueryResult]);

  return {
    render,
    ...reactQueryResult,
  };
};

/**
 * useQueryRenderState
 */
export const useQueryRenderState = <QueryFnData, QueryError extends Error, QueryData>(
  ...args: Parameters<typeof useQuery<QueryFnData, QueryError, QueryData>>
): ReturnType<typeof useQuery<QueryFnData, QueryError, QueryData>> & {
  render: ReturnType<typeof useRenderState<QueryData, QueryError>>[0];
} => {
  const queryResult = useQuery<QueryFnData, QueryError, QueryData>(...args);
  return useConvertQueryRenderStateResult(queryResult);
};

/**
 * useInfiniteQueryRenderState
 */
export const useInfiniteQueryRenderState = <QueryFnData, QueryError extends Error, QueryData>(
  ...args: Parameters<typeof useInfiniteQuery<QueryFnData, QueryError, QueryData>>
): ReturnType<typeof useInfiniteQuery<QueryFnData, QueryError, QueryData>> & {
  render: ReturnType<typeof useRenderState<QueryData, QueryError>>[0];
} => {
  const infitieQueryResult = useInfiniteQuery<QueryFnData, QueryError, QueryData>(...args);
  return useConvertQueryRenderStateResult(infitieQueryResult);
};

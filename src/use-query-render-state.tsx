import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useRenderState, IRenderState } from "react-render-state";

/**
 * useConvertQueryRenderStateResult
 * Convert the ReactQuery result to ReactRenderState result.
 */
export const useConvertQueryRenderStateResult = <
  QueryData,
  QueryError extends Error,
  QueryResult extends
    | UseQueryResult<QueryData, QueryError>
    | UseInfiniteQueryResult<QueryData, QueryError>,
>(
  reactQueryResult: QueryResult,
) => {
  const [render, , , , , , , , manipulation] = useRenderState<QueryData, QueryError>();

  /**
   * handle the `react-query` status
   */
  useEffect(() => {
    switch (reactQueryResult.status) {
      case "pending": {
        manipulation((prev) => ({
          previousData: prev.currentData,
          previousError: prev.currentError,
          currentData: undefined,
          currentError: undefined,
          status: IRenderState.Status.Loading,
        }));
        break;
      }
      case "success": {
        manipulation((prev) => ({
          previousData: prev.currentData,
          previousError: prev.currentError,
          currentData: reactQueryResult.data,
          currentError: undefined,
          status: IRenderState.Status.Success,
        }));
        break;
      }
      case "error": {
        manipulation((prev) => ({
          previousData: prev.currentData,
          previousError: prev.currentError,
          currentData: undefined,
          currentError: reactQueryResult.error,
          status: IRenderState.Status.Error,
        }));
        break;
      }
      default: {
        break;
      }
    }
  }, [manipulation, reactQueryResult.data, reactQueryResult.error, reactQueryResult.status]);

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
) => {
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

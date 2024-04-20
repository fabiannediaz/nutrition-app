import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from 'utils/supabase';

export const useSupabase = () => {
  const [loading, setLoading] = useState(true);
  const [errorResponse, setErrorResponse] = useState('');
  const [dataResponse, setDataResponse] = useState<any>();

  const query = async (table: string, user: User | undefined) => {
    try {
      setLoading(true)
      if (!user) setErrorResponse('No user on the session!');

      const { data, error, status } = await supabase
        .from(table)
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        setErrorResponse(error.message);
      }

      if (data) {
        setDataResponse(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorResponse(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const mutation = async (table: string, fields: any, user: User | undefined) => {
    try {
      setLoading(true)
      if (!user) setErrorResponse('No user on the session!');

      const { error } = await supabase.from(table).upsert(fields)

      if (error) {
        setErrorResponse(error.message);
      }
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorResponse(error.message);
      }
    }
    finally {
      setLoading(false);
    }
  }

  return {
    loading,
    data: dataResponse,
    error: errorResponse,
    query,
    mutation,
  }
}
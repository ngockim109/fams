/**
 * This file contains TypeScript code for managing email data.
 *
 * It includes functions to retrieve all emails, post multiple emails,
 * retrieve a single email by its ID, post a single email, update a single email,
 * and delete a single email. The code utilizes asynchronous functions with promises
 * and makes HTTP requests using the `get`, `post`, `put`, and `del` methods from an API module.
 * It interfaces with an `IEmail` interface to maintain type safety.
 * Additionally, error handling is implemented to log and rethrow any encountered errors.
 */
import { del, get, patch, post, put } from "../api";
import { IEmail } from "../../../interfaces/email.interface";
import { Endpoints } from "../../../constants/Api";

// get all emails
export const getEmails = async (
  searchTerm?: string,
  searchSignal?: AbortSignal
): Promise<IEmail[]> => {
  try {
    const response = await get<IEmail[]>(
      `${Endpoints.EmailTemplate}?searchterm=${searchTerm}`,
      searchSignal
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// post email
interface PostEmailProps {
  data: IEmail[];
}
export const postEmail = async ({ data }: PostEmailProps): Promise<string> => {
  try {
    const response = await post<string>(Endpoints.EmailTemplate, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

// SINGLE EMAIL
// get one email by its ID
interface GetEmailByIDProps {
  id: string;
}
export const getEmailByID = async ({
  id,
}: GetEmailByIDProps): Promise<IEmail[]> => {
  try {
    const response = await get<IEmail[]>(
      `${Endpoints.EmailTemplate}/email-template-id?EmailTemplateId=${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

export const getEmailByTypeName = async ({
  type,
  applyTo,
}: {
  type: string;
  applyTo: string;
}): Promise<IEmail[]> => {
  console.log(type);

  try {
    const response = await get<IEmail[]>(
      `${Endpoints.EmailTemplate}/${type}/${applyTo}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};
// post one email
interface PostSingleEmailProps {
  data: IEmail;
}
export const postSingleEmail = async ({
  data,
}: PostSingleEmailProps): Promise<string> => {
  try {
    const response = await post<string>(Endpoints.EmailTemplate, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

// put one email
interface PutSingleEmailProps {
  id: string;
  data: IEmail;
}
export const putSingleEmail = async ({
  id,
  data,
}: PutSingleEmailProps): Promise<string> => {
  try {
    const response = await put<string>(
      `${Endpoints.EmailTemplate}/${id}`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

// delete one email
interface DeleteEmailProps {
  id: string;
}
export const deleteSingleEmail = async ({
  id,
}: DeleteEmailProps): Promise<string> => {
  try {
    const response = await del<string>(
      `${Endpoints.EmailTemplate}?EmailTemplateID=${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

interface PatchEmailProps {
  // patch Email status to Disable (instead of Delete)
  id: string;
}
export const patchSingleEmail = async ({
  id,
}: PatchEmailProps): Promise<string> => {
  try {
    const response = await patch<string>(
      `${Endpoints.EmailTemplate}?EmailTemplateID=${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

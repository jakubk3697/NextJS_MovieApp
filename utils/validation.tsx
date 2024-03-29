import { CommentsForm } from '@/types';

export const commentsFormValidation: CommentsForm = {
  title: /^[a-zA-Z0-9\s-]{3,30}$/,
  content: /^.{10,200}$/,
  author: /^[a-zA-Z\s-]{3,25}$/
};

export const AITextToArray = (text:string) => {
  const regex = /\[([^\]]*)\]/;
  const match = text.match(regex);
  if (match) {
    const arrayString = match[1];
    const array = JSON.parse(`[${arrayString}]`);
    return array;
  } else {
    console.log("No array found.");
  }
}

export const extractUserFriendlyMessage = (error: string) =>  {
  const messageRegExp = /(?:Firebase:\s)?(.+?)(?:\s\(auth\/.+?\))?\.?$/;
  const match = error.match(messageRegExp);

  if (match && match[1]) {
    return match[1];
  }
}
import {CommentsForm} from '@/types';
  
export const commentsFormValidation: CommentsForm = {
    title: /^[a-zA-Z0-9\s-]{3,30}$/,
    content: /^.{20,200}$/,
    author: /^[a-zA-Z\s-]{3,25}$/
  };

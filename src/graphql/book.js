import { gql } from '@apollo/client';

const Books = gql`
  {
    books {
      id
      name
      genre
      time
      size
      author {
        id
        name
      }
    }
    authors {
      id
      name
    }
  }
`;

// !表示必须传的值, ID必须大写。
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $time: String!, $size: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, time: $time, size: $size, authorId: $authorId) {
      id
      name
      genre
      time
      size
      author {
        name
      }
    }
  }
`;

const editBookMutation = gql`
  mutation($id: ID!, $name: String!, $genre: String!, $time: String!, $size: String!, $authorId: ID!) {
    editBook(id: $id, name: $name, genre: $genre, time: $time, size: $size, authorId: $authorId) {
      id
      name
      genre
      time
      size
      author {
        name
      }
    }
  }
`;

const delBookMutation = gql`
  mutation($id: ID!) {
    delBook(id: $id) {
      id
    }
  }
`;

// 表头
const bookLabels = {
  id: 'ID',
  name: '作品名称',
  genre: '作品分类',
  author: '作者',
  time: '首版时间',
  size: '字数',
};

export { Books, bookLabels, addBookMutation, editBookMutation, delBookMutation };

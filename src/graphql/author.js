import { gql } from '@apollo/client';

const Authors = gql`
  {
    authors {
      id
      name
      range
      nationality
      birthplace
      works {
        name
      }
    }
  }
`;

// !表示必须传的值
const addAuthorMutation = gql`
  mutation($name: String!, $range: String!, $nationality: String!, $birthplace: String!) {
    addAuthor(name: $name, range: $range, nationality: $nationality, birthplace: $birthplace) {
      id
      name
      range
      nationality
      birthplace
    }
  }
`;

const editAuthorMutation = gql`
  mutation($id: ID!, $name: String!, $range: String!, $nationality: String!, $birthplace: String!) {
    editAuthor(id: $id, name: $name, range: $range, nationality: $nationality, birthplace: $birthplace) {
      id
      name
      range
      nationality
      birthplace
    }
  }
`;

const delAuthorMutation = gql`
  mutation($id: ID!) {
    delAuthor(id: $id) {
      id
    }
  }
`;

// 表头
const authorLabels = {
  id: 'ID',
  name: '姓名',
  range: '所处时代',
  nationality: '民族',
  birthplace: '出生地',
  works: '主要作品',
};

export { Authors, authorLabels, addAuthorMutation, editAuthorMutation, delAuthorMutation };

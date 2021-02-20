import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Books, bookLabels, addBookMutation, editBookMutation, delBookMutation } from '../../graphql/book';
import BookList from '../components/BookList';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import './book.css';
import { AutoSizer } from 'react-virtualized';
import { useSnackbar } from 'notistack';
import BookEdit from '../components/BookEdit';
import DrawerWrapper from '../../components/Drawer';

const Book = () => {
  const [bookInfo, setBookInfo] = useState({
    loading: true,
    error: '',
    reload: Promise.resolve(),
    list: [],
    authors: [],
  });
  const [editInfo, setEditInfo] = useState({
    open: false,
    loading: false,
    title: '新增书籍',
    info: {
      name: '',
      genre: '',
      time: '',
      size: '',
      authorId: '',
    },
  });

  const { loading: bookLoading, error: bookError, data: bookData, refetch: bookReFetch } = useQuery(Books, {
    variables: {},
    pollInterval: 0, // 不缓存结果
  });

  // 消息条
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (bookLoading) return;
    setBookInfo({
      loading: bookLoading,
      error: bookError,
      list: bookData.books,
      authors: bookData.authors,
      reload: bookReFetch,
    });
  }, [setBookInfo, bookLoading, bookError, bookData, bookReFetch]);

  const reloadBooks = useCallback(async () => {
    setBookInfo({
      ...bookInfo,
      loading: true,
    });
    const { data, error } = await bookInfo.reload();
    setBookInfo({
      ...bookInfo,
      loading: false,
      error,
      list: data.books,
      authors: data.authors,
    });
  }, [bookInfo, setBookInfo]);

  // 新增书籍
  const addBook = () => {
    if (!bookInfo.authors.length) {
      enqueueSnackbar('请先添加一个作者，然后才能添加书籍。', { variant: 'warning' });
      return;
    }
    setEditInfo({
      open: true,
      title: '新增书籍',
    });
  };
  // 编辑书籍
  const editBook = item => {
    setEditInfo({
      open: true,
      title: '编辑书籍',
      info: {
        ...item,
        authorId: item.author.id,
      },
    });
  };
  // 关闭窗口
  const closeEditInfo = () => {
    setEditInfo({
      ...editInfo,
      open: false,
    });
  };

  // 新增hook
  const [addBookFunc] = useMutation(addBookMutation, {
    refetchQueries: reloadBooks,
    awaitRefetchQueries: true,
    onCompleted: data => {
      console.log('成功:', data);
      setEditInfo({
        ...editInfo,
        loading: false,
      });
      closeEditInfo();
    },
    onError: e => {
      console.log('捕获错误:', e);
      enqueueSnackbar(String(e), { variant: 'error' });
    },
  });
  // 编辑hook
  const [editBookFunc] = useMutation(editBookMutation, {
    refetchQueries: reloadBooks,
    awaitRefetchQueries: true,
    onCompleted: data => {
      console.log('成功:', data);
      setEditInfo({
        ...editInfo,
        loading: false,
      });
      closeEditInfo();
    },
    onError: e => {
      console.log('捕获错误:', e);
      enqueueSnackbar(String(e), { variant: 'error' });
    },
  });
  // 提交代码
  const onSubmit = async info => {
    setEditInfo({
      ...editInfo,
      loading: true,
    });
    if (info.id) {
      await editBookFunc({
        variables: {
          id: info.id,
          name: info.name,
          genre: info.genre,
          time: info.time,
          size: info.size,
          authorId: info.authorId,
        },
      });
    } else {
      await addBookFunc({
        variables: {
          name: info.name,
          genre: info.genre,
          time: info.time,
          size: info.size,
          authorId: info.authorId,
        },
      });
    }
  };

  // 删除hook
  const [delBookFunc] = useMutation(delBookMutation, {
    refetchQueries: reloadBooks,
    awaitRefetchQueries: true,
    onCompleted: data => {
      console.log('删除成功:', data);
    },
    onError: e => {
      console.log('捕获错误:', e);
      enqueueSnackbar(String(e), { variant: 'error' });
    },
  });
  const delBook = async id => {
    await delBookFunc({
      variables: { id },
    });
  };

  return (
    <div className={'book'}>
      <div className={'book_title'}>
        <div className={'book_title_label'}>
          <LibraryBooks fontSize={'small'} />
          书籍管理
        </div>
        <Button startIcon={<AddIcon />} onClick={addBook} variant="outlined" style={{ color: '#fff' }}>
          新增书籍
        </Button>
      </div>
      <div className={'book_table'}>
        <AutoSizer>
          {({ width, height }) => (
            <BookList
              width={width}
              height={height}
              loading={bookInfo.loading}
              list={bookInfo.list}
              errorInfo={bookInfo.error}
              labels={bookLabels}
              editBook={editBook}
              delBook={delBook}
            />
          )}
        </AutoSizer>
      </div>
      <DrawerWrapper anchor={'bottom'} open={editInfo.open} onChange={closeEditInfo}>
        <BookEdit
          title={editInfo.title}
          editInfo={editInfo.info}
          loading={editInfo.loading}
          authors={bookInfo.authors}
          setEditInfo={onSubmit}
        />
      </DrawerWrapper>
    </div>
  );
};

export default Book;

import React, { useCallback, useEffect, useState } from 'react';
import AuthorList from '../components/AuthorList';
import { useQuery, useMutation } from '@apollo/client';
import { Authors, authorLabels, addAuthorMutation, editAuthorMutation, delAuthorMutation } from '../../graphql/author';
import Person from '@material-ui/icons/Person';
import './author.css';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DrawerWrapper from '../../components/Drawer';
import AuthorEdit from '../components/AuthorEdit';
import { AutoSizer } from 'react-virtualized';
import { useSnackbar } from 'notistack';

const Author = () => {
  const [authorInfo, setAuthorInfo] = useState({
    loading: true,
    error: '',
    reload: Promise.resolve(),
    list: [],
  });
  const [editInfo, setEditInfo] = useState({
    open: false,
    loading: false,
    title: '新增作者',
    info: {
      name: '',
      range: '',
      nationality: '',
      birthplace: '',
    },
  });
  // 查询hook
  const { loading: authorLoading, error: authorError, data: authorData, refetch: authorReFetch } = useQuery(Authors, {
    variables: {},
    pollInterval: 0, // 不缓存结果
  });

  // 消息条
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (authorLoading) return;
    setAuthorInfo({
      loading: authorLoading,
      error: authorError,
      list: authorData.authors,
      reload: authorReFetch,
    });
  }, [setAuthorInfo, authorLoading, authorError, authorData, authorReFetch]);

  const reloadAuthors = useCallback(async () => {
    setAuthorInfo({
      ...authorInfo,
      loading: true,
    });
    const { data, error } = await authorInfo.reload();
    setAuthorInfo({
      ...authorInfo,
      loading: false,
      error,
      list: data.authors,
    });
  }, [authorInfo, setAuthorInfo]);

  const addAuthor = () => {
    setEditInfo({
      open: true,
      title: '新增作者',
    });
  };
  const editAuthor = item => {
    setEditInfo({
      open: true,
      title: '编辑作者',
      info: item,
    });
  };

  const closeEditInfo = () => {
    setEditInfo({
      ...editInfo,
      open: false,
    });
  };

  // 编辑hook
  const [editAuthorFunc] = useMutation(editAuthorMutation, {
    refetchQueries: reloadAuthors,
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

  // 新增hook
  const [addAuthorFunc] = useMutation(addAuthorMutation, {
    refetchQueries: reloadAuthors,
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
      await editAuthorFunc({
        variables: {
          id: info.id,
          name: info.name,
          range: info.range,
          nationality: info.nationality,
          birthplace: info.birthplace,
        },
      });
    } else {
      await addAuthorFunc({
        variables: {
          name: info.name,
          range: info.range,
          nationality: info.nationality,
          birthplace: info.birthplace,
        },
      });
    }
  };

  // 删除hook
  const [delAuthorFunc] = useMutation(delAuthorMutation, {
    refetchQueries: reloadAuthors,
    awaitRefetchQueries: true,
    onCompleted: data => {
      console.log('删除成功:', data);
    },
    onError: e => {
      console.log('捕获错误:', e);
      enqueueSnackbar(String(e), { variant: 'error' });
    },
  });
  const delAuthor = async id => {
    await delAuthorFunc({
      variables: { id },
    });
  };

  return (
    <div className={'author'}>
      <div className={'author_title'}>
        <div className={'author_title_label'}>
          <Person fontSize={'small'} />
          作者管理
        </div>
        <Button startIcon={<AddIcon />} onClick={addAuthor} variant="outlined" style={{ color: '#fff' }}>
          新增作者
        </Button>
      </div>
      <div className={'author_table'}>
        <AutoSizer>
          {({ width, height }) => (
            <AuthorList
              width={width}
              height={height}
              loading={authorInfo.loading}
              list={authorInfo.list}
              errorInfo={authorInfo.error}
              labels={authorLabels}
              editAuthor={editAuthor}
              delAuthor={delAuthor}
            />
          )}
        </AutoSizer>
      </div>
      <DrawerWrapper anchor={'bottom'} open={editInfo.open} onChange={closeEditInfo}>
        <AuthorEdit title={editInfo.title} editInfo={editInfo.info} loading={editInfo.loading} setEditInfo={onSubmit} />
      </DrawerWrapper>
    </div>
  );
};

export default Author;

import React, { useState } from 'react';
import './editStyle.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const defaultValue = {
  name: '',
  genre: '',
  time: '',
  size: '',
  authorId: '',
};

const BookEdit = ({ title = '', editInfo = defaultValue, loading = false, authors = [], setEditInfo = () => {} }) => {
  const [edit, setEdit] = useState(editInfo);
  const [error, setError] = useState({
    name: {
      show: false,
      msg: '',
    },
  });

  const dataCheck = (key, value) => {
    switch (key) {
      case 'name':
        if (!value) {
          setError({
            ...error,
            name: {
              show: true,
              msg: '书籍名称不能为空',
            },
          });
          return false;
        } else {
          setError({
            ...error,
            name: {
              show: false,
              msg: '',
            },
          });
          return true;
        }
      default:
        return true;
    }
  };

  const changeName = e => {
    e.preventDefault();
    const pass = dataCheck('name', e.target.value);
    if (pass) {
      setEdit({
        ...edit,
        name: e.target.value,
      });
    }
  };
  const changeGenre = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      genre: e.target.value,
    });
  };
  const changeTime = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      time: e.target.value,
    });
  };
  const changeSize = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      size: e.target.value,
    });
  };
  const authorChange = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      authorId: e.target.value,
    });
  };

  const returnData = e => {
    e.preventDefault();
    // 每个值都检测一次
    const pass = dataCheck('name', edit.name);
    if (pass) {
      setEditInfo(edit);
    }
  };

  const dataReset = e => {
    e.preventDefault();
    // 还原数据
    setEdit(editInfo);
    // 还原警告
    setError({
      name: { show: false, msg: '' },
    });
  };

  return (
    <article className={'edit'}>
      <div className={'edit_form'}>
        <div className={'edit_form_title'}>{title}</div>
        <TextField
          label={'作品名称'}
          fullWidth
          error={error.name.show}
          helperText={error.name.msg}
          placeholder={'请输入作品名称'}
          value={edit.name}
          onChange={changeName}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={'作品分类'}
          fullWidth
          style={{ marginTop: 15 }}
          placeholder={'请输入作品分类'}
          value={edit.genre}
          onChange={changeGenre}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={'首版时间'}
          fullWidth
          style={{ marginTop: 15 }}
          placeholder={'请输入书籍的首版时间'}
          value={edit.time}
          onChange={changeTime}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={'字数'}
          fullWidth
          style={{ marginTop: 15 }}
          placeholder={'请输入书籍的字数'}
          value={edit.size}
          onChange={changeSize}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          id={'select'}
          label={'作者名称'}
          style={{ marginTop: 15 }}
          placeholder={'请求选择作者名称'}
          value={edit.authorId}
          select
          onChange={authorChange}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {authors.map(item => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginTop: 15 }}>
          <Button color="secondary" onClick={dataReset}>
            重置
          </Button>
          <Button type={'submit'} disabled={loading} onClick={returnData}>
            提交
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BookEdit;

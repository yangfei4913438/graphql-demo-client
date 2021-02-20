import React, { useState } from 'react';
import './editStyle.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const defaultValue = {
  name: '',
  range: '',
  nationality: '',
  birthplace: '',
};

const AuthorEdit = ({ title = '', editInfo = defaultValue, loading = false, setEditInfo = () => {} }) => {
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
              msg: '作者名称不能为空',
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
  const changeRange = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      range: e.target.value,
    });
  };
  const changeNationality = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      nationality: e.target.value,
    });
  };
  const changeBirthplace = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      birthplace: e.target.value,
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
          label={'作者姓名'}
          fullWidth
          error={error.name.show}
          helperText={error.name.msg}
          placeholder={'请输入作者姓名'}
          value={edit.name}
          onChange={changeName}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={'所处时代'}
          fullWidth
          style={{ marginTop: 15 }}
          placeholder={'请输入作者所处时代'}
          value={edit.range}
          onChange={changeRange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={'民族'}
          fullWidth
          style={{ marginTop: 15 }}
          placeholder={'请输入作者的民族或族群'}
          value={edit.nationality}
          onChange={changeNationality}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label={'出生地'}
          fullWidth
          style={{ marginTop: 15 }}
          placeholder={'请输入作者的出生地'}
          value={edit.birthplace}
          onChange={changeBirthplace}
          InputLabelProps={{
            shrink: true,
          }}
        />
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

export default AuthorEdit;

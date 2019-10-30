import React from 'react'
import { IListItem } from './index'

export const getColumns = (that: any) => {
    let n = 0
    const columns = [
      {
        className: 'columns_header',
        title: '序号',
        dataIndex: '_id',
        key: '_id',
        width: 40,
        render: (text: String) => {
          return ++n
        }
      },
      {
        title: '用户名',
        key: 'username',
        dataIndex: 'username',
        width: 100
      },
      {
        title: '密码',
        key: 'password',
        dataIndex: 'password',
        width: 100
      },
      {
        title: '姓氏',
        key: 'parents',
        dataIndex: 'parents',
        width: 100,
        render: (text: string) => text ?`${text}氏族谱` : '-'
      },
      {
        title: '身份',
        key: 'identity',
        dataIndex: 'identity',
        width: 100,
        render: (text: string) => text || '-'
      },
      {
        title: '操作',
        key: 'options',
        dataIndex: 'options',
        width: 80,
        render: (text: string, row: IListItem) => {
          return (
            <div>
              <span
                className="mr-10 csp"
                style={{color: 'green'}}
                onClick={() => that.handleEditUser(row)}
              >
                编辑
              </span>
              <span
                className="csp"
                style={{color: 'red'}}
                onClick={() => that.handleDeleteUser(row._id)}
              >
                删除
              </span>
            </div>
          )
        }
      }
    ];
    return columns;
  };
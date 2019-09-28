import React from 'react'
import { IListItem } from './index'

export const getColumns = (that: any) => {
    const columns = [
      {
        className: 'columns_header',
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 60
      },
      {
        title: '用户名',
        key: 'name',
        dataIndex: 'name',
        width: 100
      },
      {
        title: '账号',
        key: 'account',
        dataIndex: 'account',
        width: 100
      },
      {
        title: '密码',
        key: 'password',
        dataIndex: 'password',
        width: 100
      },
      {
        title: '身份',
        key: 'Identity',
        dataIndex: 'Identity',
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
                onClick={() => that.handleDeleteUser(row.key)}
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
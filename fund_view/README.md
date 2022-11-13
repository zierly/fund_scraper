
# 基于React、material-ui实现的todolist

## 页面说明
### Home page
- 列出用户列表与所有的todo列表
- 点击用户的头像即可查看单个用户的todo列表及完成情况

### User todo page
- 列出单个用户的todo列表及完成情况
- 点击Edit按钮即可查看并编辑用户信息

### User info page
- 可查看并编辑用户信息
- 其中username与email提供校验功能，若不符合要求则无法提交表单
    - username超过32个字符会标红提示错误
    - email格式不对会标红提示错误
- 点击提交按钮后，更新的信息会打印至控制台
## 用到的接口
1. 列出用户 GET https://jsonplaceholder.typicode.com/users/
2. 查看特定用户 GET https://jsonplaceholder.typicode.com/users/<user_id>
3. 列出所有的Todo  GET https://jsonplaceholder.typicode.com/todos/
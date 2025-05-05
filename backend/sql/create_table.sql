-- auto-generated definition
create table user
(
    id            bigint auto_increment comment '用户id'
        primary key,
    username      varchar(256)                       null comment '用户名',
    user_password varchar(512)                       null comment '用户密码',
    create_time   datetime default (now())           null comment '创建时间',
    update_time   datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间'
);


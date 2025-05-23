package com.deapt.imagecaption.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.deapt.imagecaption.constant.UserConstant;
import com.deapt.imagecaption.model.domin.User;
import com.deapt.imagecaption.service.UserService;
import com.deapt.imagecaption.mapper.UserMapper;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
* @author Deapt
* @description 针对表【user(用户表)】的数据库操作Service实现
* @createDate 2025-04-22 10:06:04
*/
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService{

    @Resource
    private UserMapper userMapper;
    @Override
    public long userRegister(String username, String userPassword, String checkPassword) {
        //1. 校验
        //判断是否有空值
        if (StringUtils.isAnyBlank(username,userPassword,checkPassword)){
            return -1;
        }

        //校验密码和密码相同
        if (!checkPassword.equals(userPassword)){
            log.info("密码不同");
            return -1;
        }

        //账号符合要求
        Matcher matcher = Pattern.compile(UserConstant.REG_EXP_ACCOUNT).matcher(username);
        if (!matcher.find()){
            log.info("账号不符合要求");
            return -1;
        }

        //密码符合要求
        matcher = Pattern.compile(UserConstant.REG_EXP_PASSWORD).matcher(userPassword);
        if (!matcher.find()){
            log.info("密码不符合要求");
            return -1;
        }

        //账户不能重复
        //使用LambdaQueryWrapper支持Lambda表达式
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        //使用::来引用方法（Lambda表达式），User::getUsername 指向实体类的 getUsername() 方法
        queryWrapper.eq(User::getUsername,username);
        //执行查询并统计符合条件的数据条数
        long count = userMapper.selectCount(queryWrapper);
        if (count > 0){
            log.info("账号重复");
            return -1;
        }

        //2. 加密
        //密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((UserConstant.SALT + userPassword).getBytes());

        //3. 插入数据
        User user = new User();
        user.setUsername(username);
        user.setUserPassword(encryptPassword);
        boolean saveUser = this.save(user);
        if (!saveUser){
            log.info("数据插入失败");
            return -1;
        }

        return user.getId();
    }

    @Override
    public User userLogin(String username, String userPassword, HttpServletRequest request) {
        //1. 校验
        //判断是否有空值
        if (StringUtils.isAnyBlank(username,userPassword)){
            return null;
        }

        //2. 加密
        //密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((UserConstant.SALT + userPassword).getBytes());

        //3.查询
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(User::getUsername,username);
        lambdaQueryWrapper.eq(User::getUserPassword,encryptPassword);
        User user = userMapper.selectOne(lambdaQueryWrapper);
        if (user == null){
            log.info("账号或密码错误，请重新输入");
            return null;
        }

        //3.用户数据脱敏（隐藏敏感信息）,使用链式构造器
        User safetyUser = User.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();

        //4. 记录用户的登录状态
        request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE, safetyUser);

        return safetyUser;
    }
}





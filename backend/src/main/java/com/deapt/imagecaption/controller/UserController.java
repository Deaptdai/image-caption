package com.deapt.imagecaption.controller;

import com.deapt.imagecaption.model.domin.User;
import com.deapt.imagecaption.model.domin.request.UserLoginRequest;
import com.deapt.imagecaption.model.domin.request.UserRegisterRequest;
import com.deapt.imagecaption.model.domin.result.Result;
import com.deapt.imagecaption.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * @author Deapt
 * @description 用户表示层
 * @since 2025/4/26 10:22
 */

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Resource
    private UserService userService;
    @PostMapping("/register")
    public Result<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        log.info("用户注册:{}",userRegisterRequest);
        //1. 判断请求体是否为空
        if (userRegisterRequest == null){
            return Result.error("请求体为空");
        }
        //2. 获取所需数据
        String userAccount = userRegisterRequest.getUsername();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();

        if (StringUtils.isBlank(userAccount)){
            log.info("请输入用户名");
            return Result.error("请输入用户名");
        }else if(StringUtils.isBlank(userPassword)){
            log.info("请输入密码");
            return Result.error("请输入密码");
        }else if (StringUtils.isBlank(checkPassword)){
            log.info("请再次确认密码");
            return Result.error("请再次确认密码");
        }

        long id = userService.userRegister(userAccount, userPassword, checkPassword);
        if (id <= 0){
            return Result.error("注册失败");
        }
        return Result.success(id);
    }

    @PostMapping("/login")
    public Result<User> userLogin(@RequestBody UserLoginRequest userRegisterRequest, HttpServletRequest request){
        log.info("用户登录:{}",userRegisterRequest);
        //1. 判断请求体是否为空
        if (userRegisterRequest == null){
            return Result.error("请求体为空");
        }
        //2. 获取所需数据
        String userAccount = userRegisterRequest.getUsername();
        String userPassword = userRegisterRequest.getUserPassword();

        if (StringUtils.isBlank(userAccount)){
            log.info("请输入用户名");
            return Result.error("请输入用户名");
        }else if(StringUtils.isBlank(userPassword)){
            log.info("请输入密码");
            return Result.error("请输入密码");
        }

        User user = userService.userLogin(userAccount, userPassword, request);
        if (user == null){
            return Result.error("登录失败");
        }
        return Result.success(user);
    }


}

package com.simedtrieste.service.user;

import java.util.List;

import com.simedtrieste.model.user.User;

public interface UserService {

    public List<User> getAllUser();

    public User getUserById(Long id);

    public long addUser(User User);

    public boolean deleteUserById(Long id);

    public boolean deleteAll();

    public boolean updateUser(User user);

}

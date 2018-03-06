package com.simedtrieste.dao.user;

import java.util.List;
import java.util.Optional;

import com.simedtrieste.model.user.User;

public interface UserDao {

    public List<User> getAllUser();

    public User getUserById(Long id);

    public Optional<User> getUserByEmail(String email);

    public long addUser(User People);

    public boolean deleteUserById(Long id);

    public boolean deleteAll();

    public boolean updateUser(User People);


}

package com.simedtrieste.jdbc.user;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.simedtrieste.model.user.User;

public class UserExtractor implements ResultSetExtractor {

    public User extractData(ResultSet resultSet) throws SQLException, DataAccessException {

        User user = new User();
        int id = 1;
        user.setId(resultSet.getLong(id++));
        user.setName(resultSet.getString(id++));
        user.setEmail(resultSet.getString(id++));
        user.setPassword(resultSet.getString(id++));
        return user;
    }
}

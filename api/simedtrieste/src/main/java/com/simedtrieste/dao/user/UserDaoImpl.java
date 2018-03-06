package com.simedtrieste.dao.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.simedtrieste.jdbc.user.UserRowMapper;
import com.simedtrieste.model.user.User;

@Service("userDao")
public class UserDaoImpl implements UserDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

    @Autowired
    DataSource dataSource;

    public List<User> getAllUser() {

        List userList = new ArrayList();
        String sql = "select * from user";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        userList = jdbcTemplate.query(sql, new UserRowMapper());
        return userList;
    }
	
    public User getUserById(Long id) {

        User user = new User();
        List<User> userList = new ArrayList<User>();
        String sql = "select * from user where id= " + id;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        userList = jdbcTemplate.query(sql, new UserRowMapper());
        if (userList.size() > 0) {
            return userList.get(0);
        }
        return user;
    }

    @Override
    public Optional<User> getUserByEmail(String email) {

        String sql = "SELECT * FROM user WHERE email = ?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List<User> userList = jdbcTemplate.query(sql, new Object[] { email }, new UserRowMapper());
        if (userList.size() == 1) {
            return Optional.of(userList.get(0));
        } else if (userList.size() > 1) {
            throw new RuntimeException("Multiple user with the same email:" + email);
        }
        return Optional.empty();
    }

    public String encodeMD5(String p_str) {

        String ret = DigestUtils.md5Hex(p_str);
        return ret;
    }

    public boolean deleteUserById(Long id) {

        boolean ret = true;
        try {
            String sql = "delete from User where id =" + id;
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql);
        } catch (Exception ex) {
            LOGGER.error("deleteUserById got error: " + ex.getMessage());
        }
        return ret;
    }

    public boolean deleteAll() {

        boolean ret = true;
        try {
            String sql = "delete from user";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql);
        } catch (Exception ex) {
            LOGGER.debug("deleteAll got error: " + ex.getMessage());
        }
        return ret;
    }
    public long getMaxUserId(String sql) {
    	long maxId = 0L;
    	try {
			Connection connection = dataSource.getConnection();
			PreparedStatement pst = connection.prepareStatement(sql);
			ResultSet rs = pst.executeQuery();
			while( rs.next() )
			{
			    maxId = rs.getLong("maxid");
			}
		} catch (SQLException ex) {
			LOGGER.error("getMaxId got error: " + ex.getMessage());
		}
    	System.out.println("maxUserId: " + maxId);
    	return maxId;
    }
    public long addUser(User user) {

        boolean ret = true;
        long maxId = 0L;
        try {
            String sql = "INSERT INTO user "
                    + "(name, email, password) VALUES "
                    + "(?, ?, ?)";

            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(
                    sql,
                    new Object[] {
                    		user.getName(),
                    		user.getEmail(),
                    		user.getPassword()
                    });
        } catch (Exception ex) {
            ret = false;
            LOGGER.error("addUser got error: " + ex.getMessage());
        }
        if(ret) {
        	String sql = "SELECT MAX(id) as maxid FROM user"; 
        	maxId = getMaxUserId(sql);
        	LOGGER.debug("maxId: " + maxId);
        }        
        return maxId;
    }
    public boolean updateUser(User user) {

        boolean ret = true;
        String sql = "update user set name = ?, email = ?, password = ? "
                + " where id = ?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        LOGGER.debug("userId = " + user.getId());
        try {
            jdbcTemplate.update(
                    sql,
                    new Object[] {
                    		user.getName(),
                    		user.getEmail(),
                    		user.getPassword(),
                    		user.getId()
                    		});
        } catch (Exception ex) {
            ret = false;
            LOGGER.error("updateUser got error: " + ex.getMessage());
        }
        return ret;
    }

}

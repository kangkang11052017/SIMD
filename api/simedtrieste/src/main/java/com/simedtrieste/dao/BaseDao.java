package com.simedtrieste.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public class BaseDao {

    protected static final String SQL = "sql: ";

    @Autowired
    private DataSource dataSource;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public DataSource getDataSource() {

        return dataSource;
    }

    public NamedParameterJdbcTemplate getJdbcTemplate() {

        return namedParameterJdbcTemplate;
    }

}

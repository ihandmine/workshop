import pymysql.cursors

# Connect to the database
__connection = None


def init_connection(host, user, password, database):
    global __connection
    if __connection is None:
        __connection = pymysql.connect(host=host,
                        user=user,
                        password=password,
                        database=database,
                        cursorclass=pymysql.cursors.DictCursor)


def execute_insert(sql, data):
    assert __connection, "connection not be instance"
    with __connection:
        with __connection.cursor() as cursor:
            # Create a new record
            # sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
            # cursor.execute(sql, ('webmaster@python.org', 'very-secret'))
            result = cursor.execute(sql, data)
            print(result)

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        __connection.commit()


def execute_query(sql, args=None):
    assert __connection, "connection not be instance"
    with __connection:
        with __connection.cursor() as cursor:
            # Read a single record
            # sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
            # cursor.execute(sql, ('webmaster@python.org',))
            cursor.execute(sql, args)
            result = cursor.fetchall()
            print(result)
            return result




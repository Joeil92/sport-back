export default class UserQueries
{
    public readonly add = `
    INSERT INTO user(
        email,
        password,
        firstname,
        lastname,
        phone,
        weigth,
        size,
        imageUrl,
        roles
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, JSON_ARRAY(?));`

    public readonly findByEmail = `SELECT * FROM user WHERE email = ? LIMIT 1`;
}
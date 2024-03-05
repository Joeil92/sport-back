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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
}
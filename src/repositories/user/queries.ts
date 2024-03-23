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

    public readonly updateAvatar = `UPDATE user SET imageUrl = ? WHERE id = ?`;

    public readonly updateSize = `UPDATE user SET size = ? WHERE id = ?`;

    public readonly updateWeight = `UPDATE user SET weight = ? WHERE id = ?`;

    public readonly findByEmail = `SELECT * FROM user WHERE email = ? LIMIT 1`;

    public readonly findById = `SELECT
    id,
    email,
    firstname,
    lastname,
    phone,
    weigth,
    size,
    imageUrl,
    roles
    FROM user
    WHERE id = ?`;

    public readonly findAll = `SELECT
    id,
    email,
    firstname,
    lastname,
    phone,
    weigth,
    size,
    imageUrl,
    roles
    FROM user`;
}
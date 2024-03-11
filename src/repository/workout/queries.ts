export default class WorkoutQueries
{
    public readonly add = `
    INSERT INTO workout(
        name,
        time,
        user_id        
    ) VALUES(?, ?, ?)`;
}
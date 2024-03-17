export default class WorkoutQueries
{
    public readonly add = `
    INSERT INTO workout(
        name,
        user_id        
    ) VALUES(?, ?)`;
}
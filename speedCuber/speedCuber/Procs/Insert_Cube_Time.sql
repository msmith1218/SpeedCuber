CREATE PROCEDURE [dbo].[Insert_Cube_Time]
	@theId VARCHAR(255),
	@theTime float
AS


INSERT INTO [dbo].[CubeTimes] ([Id], [Time]) VALUES (@theId, @theTime)


GO




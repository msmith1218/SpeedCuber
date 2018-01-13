namespace speedCuber.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Cube : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CubeTimes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        Time = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CubeTimes");
        }
    }
}

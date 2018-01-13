namespace speedCuber.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CubeType : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CubeTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.CubeTimes", "Type", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CubeTimes", "Type");
            DropTable("dbo.CubeTypes");
        }
    }
}

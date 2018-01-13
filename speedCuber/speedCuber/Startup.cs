using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(speedCuber.Startup))]
namespace speedCuber
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

using System;
using System.Web.Mvc;
using speedCuber.Models;

namespace speedCuber.Controllers
{
    public class ScramblerController : Controller
    {
        public string[] GetScramble()
        {
            
            var specs = new ScrambleSpecs();
            string[] poss = specs.GetPossibles();

            string[] items = new string[specs.NumItems];

            for (var i = 0; i < specs.NumItems; i++)
            {
                Random rnd = new Random();
                string itemToAdd = "";
                int addPrime = rnd.Next(1, 4);
                int addTwo = rnd.Next(1, 6);
                string getFace = poss[rnd.Next(0, 6)];
                itemToAdd += getFace;
                if (addTwo > 4)
                {
                    itemToAdd += "2";
                }
                else if (addPrime > 2)
                {
                    itemToAdd += "'";
                }
                if (i > 0)
                {
                    if (itemToAdd != items[i - 1])
                    {
                        items[i] = itemToAdd;
                    }
                    else
                    {
                        i--;
                    }
                }
                items[i] = itemToAdd;
            }
            return items;
        }

        public string GetScrambleString()
        {
            var specs = new ScrambleSpecs();
            string[] scramble = GetScramble();
            string finalScramble = "";

            for (int i = 0; i < specs.NumItems; i++)
            {
                finalScramble += scramble[i];
                finalScramble += " ";
            }

            return finalScramble;
        }
    }
}
using NUnit.Framework;
using Star_Wars.API.Helpers;

namespace Tests
{
    public class Tests
    {
        [Test]
        public void PassingTest()
        {
            const int toSet = 50;
            
            CharacterParams characterParams = new CharacterParams();

            characterParams.PageSize = toSet;
            
            Assert.AreEqual(toSet, characterParams.PageSize);
        }
        
        [Test]
        public void FailingTest()
        {
            const int toSet = 100;

            CharacterParams characterParams = new CharacterParams();

            characterParams.PageSize = toSet;
            
            Assert.AreEqual(toSet, characterParams.PageSize);
              
        }
    }
}
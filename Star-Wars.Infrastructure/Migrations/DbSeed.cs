using System.Collections;
using System.Collections.Generic;
using Star_Wars.Domain;
using Star_Wars.Infrastructure.Persistence;

namespace Star_Wars.Infrastructure.Migrations
{
    public class DbSeed
    {
        private readonly StarWarsDbContext _starWarsDbContext;

        public DbSeed(StarWarsDbContext starWarsDbContext)
        {
            _starWarsDbContext = starWarsDbContext;
        }

        public void Seed()
        {
            var charactersList = BuildCharactersList();
            _starWarsDbContext.Characters.AddRange(charactersList);
            _starWarsDbContext.SaveChanges();

            var episodesList = BuildEpisodesList();
            _starWarsDbContext.Episodes.AddRange(episodesList);
            _starWarsDbContext.SaveChanges();

            var characterToEpisodeXrefsList = BuildCharacterToEpisodeXrefsList();
            _starWarsDbContext.CharacterToEpisodeXrefs.AddRange(characterToEpisodeXrefsList);
            _starWarsDbContext.SaveChanges();

            var friendsList = BuildFriendsList();
            _starWarsDbContext.Friends.AddRange(friendsList);
            _starWarsDbContext.SaveChanges();
        }

        private IEnumerable<Character> BuildCharactersList()
        {
            List<string> names = new List<string>();
            names.Add("Luke Skywalker");
            names.Add("Darth Vader");
            names.Add("Han Solo");
            names.Add("Leia Organa");
            names.Add("Wilhuff Tarkin");
            names.Add("C-3PO");
            names.Add("R2-D2");
            
            var characterList = new List<Character>();

            foreach (var name in names)
            {
                var character = new Character
                {
                    Name = name
                };
                characterList.Add(character);
            }

            return characterList;
        }

        private IEnumerable<Episode> BuildEpisodesList()
        {
            List<string> names = new List<string>();
            names.Add("NEWHOPE");
            names.Add("EMPIRE");
            names.Add("JEDI");
            
            var episodesList = new List<Episode>();

            foreach (var name in names)
            {
                var episode = new Episode
                {
                    Name = name
                };
                
                episodesList.Add(episode);
            }

            return episodesList;
        }

        private IEnumerable<CharacterToEpisodeXref> BuildCharacterToEpisodeXrefsList()
        {
            var characterToEpisodeList = new List<CharacterToEpisodeXref>();

            for (int i = 1; i <= 7; i++)
            {
                if (i == 5)
                {
                    var characterToEpisode = new CharacterToEpisodeXref
                    {
                        CharacterId = i,
                        EpisodeId = 1
                    };
                    
                    characterToEpisodeList.Add(characterToEpisode);
                }
                else
                {
                    for (int j = 1; j <= 3; j++)
                    {
                        var characterToEpisode = new CharacterToEpisodeXref
                        {
                            CharacterId = i,
                            EpisodeId = j
                        };
                        
                        characterToEpisodeList.Add(characterToEpisode);
                    }
                }
            }

            return characterToEpisodeList;
        }

        private IEnumerable<Friend> BuildFriendsList()
        {
            var friendsList = new List<Friend>();
            // Luke
            for (int i = 3; i <= 7; i++)
            {
                if (i == 5)
                {
                    continue;
                }

                var friend = new Friend
                {
                    CharacterId = 1,
                    FriendId = i
                };
                
                friendsList.Add(friend);
            }
            
            // Darth
            var vadersFriend = new Friend
            {
                CharacterId = 2,
                FriendId = 5
            };
            
            friendsList.Add(vadersFriend);
            
            // Han
            for (int i = 1; i <= 7; i++)
            {
                if (i == 2 || i == 3 || i == 5 || i == 6) 
                {
                    continue;
                }

                var friend = new Friend
                {
                    CharacterId = 3,
                    FriendId = i
                };
                
                friendsList.Add(friend);
            }
            
            // Leia
            for (int i = 1; i <= 7; i++)
            {
                if (i == 2 || i == 4 || i == 5) 
                {
                    continue;
                }

                var friend = new Friend
                {
                    CharacterId = 4,
                    FriendId = i
                };
                
                friendsList.Add(friend);
            }
            
            // Wilhuff
            var tarkinsFriend = new Friend
            {
                CharacterId = 5,
                FriendId = 2
            };
            
            friendsList.Add(tarkinsFriend);
            
            // C-3PO
            for (int i = 1; i <= 7; i++)
            {
                if (i == 2 || i == 5 || i == 6) 
                {
                    continue;
                }

                var friend = new Friend
                {
                    CharacterId = 6,
                    FriendId = i
                };
                
                friendsList.Add(friend);
            }
            
            // R2-D2
            
            for (int i = 1; i <= 4; i++)
            {
                if (i == 2) 
                {
                    continue;
                }

                var friend = new Friend
                {
                    CharacterId = 7,
                    FriendId = i
                };
                
                friendsList.Add(friend);
            }

            return friendsList;
        }
    }
}
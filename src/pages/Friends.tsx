import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Friend {
  id: number;
  name: string;
  username: string;
  status: 'online' | 'offline';
  isFriend: boolean;
}

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const friends: Friend[] = [
    { id: 1, name: 'Мария Иванова', username: '@mary_vintage', status: 'online', isFriend: true },
    { id: 2, name: 'Дмитрий Петров', username: '@dima_retro', status: 'offline', isFriend: true },
    { id: 3, name: 'Анна Смирнова', username: '@anna_old', status: 'online', isFriend: true },
  ];

  const subscribers: Friend[] = [
    { id: 4, name: 'Олег Сидоров', username: '@oleg_classic', status: 'online', isFriend: false },
    { id: 5, name: 'Елена Козлова', username: '@lena_past', status: 'offline', isFriend: false },
  ];

  const subscriptions: Friend[] = [
    { id: 6, name: 'Игорь Морозов', username: '@igor_memory', status: 'offline', isFriend: false },
    { id: 7, name: 'Светлана Волкова', username: '@sveta_nostalgia', status: 'online', isFriend: false },
  ];

  const renderUserCard = (user: Friend, showActions: boolean = true) => (
    <Card key={user.id} className="p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {user.status === 'online' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Icon name="MessageCircle" size={16} />
          </Button>
          <Button size="sm" variant="outline">
            <Icon name="UserMinus" size={16} />
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="absolute top-6 left-6 z-50">
        <Link to="/">
          <Button variant="outline">
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <Card className="p-8 polaroid-shadow">
          <h1 className="text-3xl font-bold mb-6">Друзья и подписки</h1>

          <div className="mb-6">
            <Input
              placeholder="Поиск друзей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="friends">
                Друзья ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="subscribers">
                Подписчики ({subscribers.length})
              </TabsTrigger>
              <TabsTrigger value="subscriptions">
                Подписки ({subscriptions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="space-y-3">
              {friends.map((friend) => renderUserCard(friend))}
            </TabsContent>

            <TabsContent value="subscribers" className="space-y-3">
              {subscribers.map((subscriber) => renderUserCard(subscriber))}
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-3">
              {subscriptions.map((subscription) => renderUserCard(subscription))}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Friends;

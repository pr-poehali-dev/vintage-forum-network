import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface ForumSection {
  id: number;
  title: string;
  description: string;
  topics: number;
  posts: number;
  icon: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
}

const Forum = () => {
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');

  const sections: ForumSection[] = [
    { id: 1, title: 'Общение', description: 'Общие темы и знакомства', topics: 45, posts: 328, icon: '💬' },
    { id: 2, title: 'Творчество', description: 'Делитесь своими работами', topics: 32, posts: 156, icon: '🎨' },
    { id: 3, title: 'Музыка', description: 'Обсуждение любимой музыки', topics: 28, posts: 203, icon: '🎵' },
    { id: 4, title: 'Книги', description: 'Рекомендации и обзоры', topics: 19, posts: 142, icon: '📚' },
  ];

  const recentTopics: ForumTopic[] = [
    { id: 1, title: 'Какую книгу читаете сейчас?', author: 'Мария', replies: 23, views: 156, lastActivity: '5 мин назад' },
    { id: 2, title: 'Винтажные фотографии моей бабушки', author: 'Дмитрий', replies: 45, views: 289, lastActivity: '15 мин назад' },
    { id: 3, title: 'Посоветуйте ретро-музыку', author: 'Анна', replies: 12, views: 98, lastActivity: '1 час назад' },
  ];

  const handleCreateSection = () => {
    console.log('Creating section:', { title: newSectionTitle, description: newSectionDescription });
    setNewSectionTitle('');
    setNewSectionDescription('');
  };

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

      <div className="max-w-6xl mx-auto pt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Форум</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" className="mr-2" size={18} />
                Создать раздел
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый раздел форума</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Input
                    placeholder="Название раздела"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Описание раздела"
                    value={newSectionDescription}
                    onChange={(e) => setNewSectionDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateSection} className="w-full">
                  Создать
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Разделы</h2>
            <div className="space-y-3">
              {sections.map((section) => (
                <Card key={section.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{section.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{section.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>📝 {section.topics} тем</span>
                        <span>💬 {section.posts} сообщений</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="ChevronRight" size={20} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Последние темы</h2>
            <div className="space-y-3">
              {recentTopics.map((topic) => (
                <Card key={topic.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{topic.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold mb-1">{topic.title}</h3>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span>Автор: {topic.author}</span>
                          <span>💬 {topic.replies}</span>
                          <span>👁 {topic.views}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forum;

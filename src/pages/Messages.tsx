import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Мария Иванова', lastMessage: 'Привет! Как дела?', timestamp: '10:30', unread: 2, online: true },
    { id: 2, name: 'Дмитрий Петров', lastMessage: 'Смотрел твои фото, класс!', timestamp: 'Вчера', unread: 0, online: false },
    { id: 3, name: 'Анна Смирнова', lastMessage: 'Спасибо за книгу!', timestamp: '2 дня', unread: 1, online: true },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', sender: 'other', timestamp: '10:28' },
    { id: 2, text: 'Привет! Всё отлично, спасибо!', sender: 'me', timestamp: '10:29' },
    { id: 3, text: 'Видела твои новые фото в календаре', sender: 'other', timestamp: '10:30' },
    { id: 4, text: 'Очень красиво получилось!', sender: 'other', timestamp: '10:30' },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending:', messageText);
      setMessageText('');
    }
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

      <div className="max-w-7xl mx-auto pt-20">
        <Card className="grid grid-cols-[350px_1fr] h-[calc(100vh-140px)] overflow-hidden">
          <div className="border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-3">Сообщения</h2>
              <Input placeholder="Поиск диалогов..." />
            </div>
            <ScrollArea className="h-[calc(100%-100px)]">
              <div className="p-2">
                {chats.map((chat) => (
                  <Card
                    key={chat.id}
                    className={`p-3 mb-2 cursor-pointer hover:bg-accent transition-colors ${
                      selectedChat === chat.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>М</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Мария Иванова</h3>
                    <p className="text-xs text-green-500">В сети</p>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Input
                      placeholder="Напишите сообщение..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Выберите диалог
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type ColorTheme = 'beige' | 'monochrome' | 'emerald' | 'vibrant' | 'colorblind';

interface DayData {
  day: number;
  icon: string;
  weekday: string;
}

const Index = () => {
  const [theme, setTheme] = useState<ColorTheme>('beige');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedBookItem, setSelectedBookItem] = useState<string | null>(null);

  const themeOptions = [
    { value: 'monochrome', label: 'Черно-белый' },
    { value: 'beige', label: 'Бежево-коричневый' },
    { value: 'emerald', label: 'Изумрудно-бежевый' },
    { value: 'vibrant', label: 'Яркие цвета' },
    { value: 'colorblind', label: 'Для дальтонизма' }
  ];

  const calendarDays: DayData[] = [
    { day: 1, icon: '📚', weekday: 'ПН' },
    { day: 2, icon: '🎨', weekday: 'ВТ' },
    { day: 3, icon: '🎵', weekday: 'СР' },
    { day: 4, icon: '⚽', weekday: 'ЧТ' },
    { day: 5, icon: '🍳', weekday: 'ПТ' },
    { day: 6, icon: '🎮', weekday: 'СБ' },
    { day: 7, icon: '✈️', weekday: 'ВС' },
    { day: 8, icon: '💻', weekday: 'ПН' },
    { day: 9, icon: '🎭', weekday: 'ВТ' },
    { day: 10, icon: '🏃', weekday: 'СР' },
    { day: 11, icon: '📷', weekday: 'ЧТ' },
    { day: 12, icon: '🎬', weekday: 'ПТ' }
  ];

  const bookshelfItems = [
    { id: 'book1', type: 'book', title: 'Мой дневник', icon: '📖' },
    { id: 'album1', type: 'album', title: 'Лето 2024', icon: '📸' },
    { id: 'sketch1', type: 'sketch', title: 'Скетчи', icon: '🎨' },
    { id: 'music1', type: 'music', title: 'Любимое', icon: '🎵' },
    { id: 'files1', type: 'files', title: 'Документы', icon: '📁' }
  ];

  const handleThemeChange = (value: ColorTheme) => {
    setTheme(value);
    document.documentElement.setAttribute('data-theme', value);
  };

  return (
    <div className="min-h-screen p-6 transition-colors duration-300">
      <div className="absolute top-6 left-6 z-50">
        <Link to="/auth">
          <Button variant="outline">
            <Icon name="LogIn" className="mr-2" size={18} />
            Вход
          </Button>
        </Link>
      </div>
      
      <div className="absolute top-6 right-6 z-50">
        <Select value={theme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[200px] bg-card">
            <SelectValue placeholder="Выбрать палитру" />
          </SelectTrigger>
          <SelectContent>
            {themeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr_200px] gap-8">
        <div className="space-y-6">
          <Card className="p-6 polaroid-shadow bg-card border-4 border-background relative">
            <div className="absolute -rotate-2 inset-0 bg-card -z-10 border-4 border-muted"></div>
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-background">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-4xl">👤</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-2">
              <h2 className="font-bold text-xl">Александр</h2>
              <p className="text-sm text-muted-foreground">@sasha_vintage</p>
              <p className="text-xs text-muted-foreground">15 марта 1995</p>
            </div>
            <Button 
              className="w-full mt-4"
              variant={isFollowing ? "outline" : "default"}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Отписаться' : 'Подписаться'}
            </Button>
          </Card>

          <Card className="p-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Сообщения
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Users" className="mr-2" size={20} />
              Друзья
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="MessageSquare" className="mr-2" size={20} />
              Форум
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Settings" className="mr-2" size={20} />
              Настройки
            </Button>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="p-6 bg-card calendar-flip relative">
            <div className="absolute top-4 right-4 w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Icon name="Calendar" size={16} />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Ноябрь 2025</h2>
            <div className="grid grid-cols-7 gap-3">
              {calendarDays.map((item) => (
                <Card
                  key={item.day}
                  className="aspect-square p-3 cursor-pointer hover:scale-105 transition-all hover:shadow-lg"
                  onClick={() => setSelectedDay(item.day)}
                >
                  <div className="text-xs text-muted-foreground mb-1">{item.weekday}</div>
                  <div className="text-lg font-bold mb-1">{item.day}</div>
                  <div className="text-2xl text-center">{item.icon}</div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h2 className="text-2xl font-bold mb-6">Книжная полка</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {bookshelfItems.map((item) => (
                <Card
                  key={item.id}
                  className="min-w-[120px] h-[160px] p-4 cursor-pointer hover:scale-105 transition-all hover:shadow-lg flex flex-col items-center justify-center"
                  onClick={() => setSelectedBookItem(item.id)}
                >
                  <div className="text-5xl mb-2">{item.icon}</div>
                  <p className="text-xs text-center font-medium">{item.title}</p>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-bold mb-3 text-sm">Онлайн</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-card"></div>
                  </div>
                  <span className="text-xs">Друг {i}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">День {selectedDay} - Моя доска</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="detective" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="detective">Детектив</TabsTrigger>
              <TabsTrigger value="notebook">Тетрадь</TabsTrigger>
              <TabsTrigger value="kawaii">Кавайный</TabsTrigger>
              <TabsTrigger value="planner">Планер</TabsTrigger>
              <TabsTrigger value="blank">Чистый</TabsTrigger>
            </TabsList>
            <TabsContent value="detective" className="mt-4">
              <div className="min-h-[400px] bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-lg border-4 border-amber-800 relative">
                <div className="absolute top-4 left-4 w-16 h-20 bg-white shadow-lg transform rotate-3"></div>
                <div className="absolute top-12 right-8 w-20 h-16 bg-white shadow-lg transform -rotate-6"></div>
                <div className="text-center mt-16">
                  <p className="text-muted-foreground">Добавьте фото, заметки, музыку...</p>
                  <p className="text-sm text-muted-foreground mt-2">Рисуйте и добавляйте стикеры</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notebook" className="mt-4">
              <div className="min-h-[400px] bg-white p-8 rounded-lg border-2 border-blue-200 relative" style={{ backgroundImage: 'repeating-linear-gradient(white 0px, white 24px, #e3f2fd 24px, #e3f2fd 26px)' }}>
                <div className="text-center mt-16">
                  <p className="text-muted-foreground">Тетрадь в клеточку</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="kawaii" className="mt-4">
              <div className="min-h-[400px] bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-lg border-4 border-pink-300 relative">
                <div className="text-center mt-16">
                  <p className="text-muted-foreground">Кавайный ежедневник 💖</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="planner" className="mt-4">
              <div className="min-h-[400px] bg-white p-8 rounded-lg border border-gray-300">
                <div className="text-center mt-16">
                  <p className="text-muted-foreground">Строгий планировщик</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="blank" className="mt-4">
              <div className="min-h-[400px] bg-white p-8 rounded-lg">
                <div className="text-center mt-16">
                  <p className="text-muted-foreground">Чистый белый лист</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedBookItem !== null} onOpenChange={() => setSelectedBookItem(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {bookshelfItems.find(item => item.id === selectedBookItem)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="min-h-[500px] bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-8 h-full">
              <div className="bg-white p-8 shadow-inner rounded border-l-4 border-amber-200">
                <p className="text-muted-foreground text-center">Левая страница</p>
              </div>
              <div className="bg-white p-8 shadow-inner rounded border-r-4 border-amber-200">
                <p className="text-muted-foreground text-center">Правая страница</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
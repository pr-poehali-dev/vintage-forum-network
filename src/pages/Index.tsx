import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type ColorTheme = 'beige' | 'monochrome' | 'emerald' | 'vibrant' | 'colorblind';

interface DayData {
  day: number;
  icon: string;
  weekday: string;
}

interface UploadedFile {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  name: string;
  url: string;
  x: number;
  y: number;
}

interface DayContent {
  [key: number]: UploadedFile[];
}

const Index = () => {
  const [theme, setTheme] = useState<ColorTheme>('beige');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedBookItem, setSelectedBookItem] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(0);
  const [dayContent, setDayContent] = useState<DayContent>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selectedDay) return;

    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach((file, index) => {
      const type = file.type.startsWith('image/') ? 'image' :
                   file.type.startsWith('video/') ? 'video' :
                   file.type.startsWith('audio/') ? 'audio' : 'document';
      
      newFiles.push({
        id: `${Date.now()}-${index}`,
        type,
        name: file.name,
        url: URL.createObjectURL(file),
        x: 50 + (index * 30),
        y: 50 + (index * 30)
      });
    });

    setDayContent(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), ...newFiles]
    }));
  };

  const handleDragStart = (e: React.MouseEvent, itemId: string, currentX: number, currentY: number) => {
    setDraggedItem(itemId);
    setDragOffset({ x: e.clientX - currentX, y: e.clientY - currentY });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!draggedItem || !selectedDay) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setDayContent(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay]?.map(item =>
        item.id === draggedItem ? { ...item, x: newX, y: newY } : item
      ) || []
    }));
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => prev + 1);
  };

  const handlePrevMonth = () => {
    setCalendarMonth(prev => Math.max(0, prev - 1));
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
            <Link to="/messages">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Сообщения
              </Button>
            </Link>
            <Link to="/friends">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Users" className="mr-2" size={20} />
                Друзья
              </Button>
            </Link>
            <Link to="/forum">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="MessageSquare" className="mr-2" size={20} />
                Форум
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Settings" className="mr-2" size={20} />
                Настройки
              </Button>
            </Link>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="calendar-3d p-0 overflow-hidden relative">
            <div className="calendar-binding">
              <div className="flex justify-center gap-8 pt-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="calendar-spiral" style={{ left: `${i * 12}%` }} />
                ))}
              </div>
            </div>
            <div className="calendar-page p-8 pt-12">
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <h2 className="text-2xl font-bold">Ноябрь 2025 {calendarMonth > 0 && `+${calendarMonth}`}</h2>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {calendarDays.map((item) => (
                  <Card
                    key={item.day}
                    className="aspect-square p-3 cursor-pointer hover:scale-110 hover:-translate-y-2 transition-all hover:shadow-2xl relative overflow-hidden"
                    onClick={() => setSelectedDay(item.day)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"></div>
                    <div className="relative">
                      <div className="text-xs text-muted-foreground mb-1">{item.weekday}</div>
                      <div className="text-lg font-bold mb-1">{item.day}</div>
                      <div className="text-2xl text-center">{item.icon}</div>
                      {dayContent[item.day]?.length > 0 && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          <div className="bookshelf-3d relative">
            <div className="bookshelf-shadow"></div>
            <h2 className="text-2xl font-bold mb-6">Книжная полка</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4">
              {bookshelfItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card
                    className="book-3d min-w-[120px] h-[180px] p-4 cursor-pointer flex flex-col items-center justify-center relative overflow-hidden"
                    onClick={() => setSelectedBookItem(item.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-2">{item.icon}</div>
                      <p className="text-xs text-center font-medium">{item.title}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
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
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">День {selectedDay} - Моя доска</DialogTitle>
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Icon name="Upload" className="mr-2" size={18} />
                  Загрузить файлы
                </Button>
              </div>
            </div>
          </DialogHeader>
          <Tabs defaultValue="detective" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="detective">Детектив</TabsTrigger>
              <TabsTrigger value="notebook">Тетрадь</TabsTrigger>
              <TabsTrigger value="kawaii">Кавайный</TabsTrigger>
              <TabsTrigger value="planner">Планер</TabsTrigger>
              <TabsTrigger value="blank">Чистый</TabsTrigger>
            </TabsList>
            
            <TabsContent value="detective" className="mt-4">
              <div 
                className="min-h-[500px] bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-lg border-4 border-amber-800 relative board-cork overflow-hidden"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {selectedDay && dayContent[selectedDay]?.map((file) => (
                  <div
                    key={file.id}
                    className="draggable-item"
                    style={{ left: file.x, top: file.y }}
                    onMouseDown={(e) => handleDragStart(e, file.id, file.x, file.y)}
                  >
                    {file.type === 'image' && (
                      <img src={file.url} alt={file.name} className="w-32 h-32 object-cover shadow-lg rounded border-4 border-white" />
                    )}
                    {file.type === 'video' && (
                      <video src={file.url} className="w-48 h-32 object-cover shadow-lg rounded border-4 border-white" controls />
                    )}
                    {file.type === 'audio' && (
                      <div className="bg-white p-3 rounded shadow-lg border-2 border-amber-700">
                        <Icon name="Music" size={24} className="mb-2" />
                        <audio src={file.url} controls className="w-48" />
                        <p className="text-xs mt-1 truncate">{file.name}</p>
                      </div>
                    )}
                    {file.type === 'document' && (
                      <div className="bg-white p-4 rounded shadow-lg border-2 border-amber-700 w-32">
                        <Icon name="FileText" size={32} className="mb-2" />
                        <p className="text-xs truncate">{file.name}</p>
                      </div>
                    )}
                  </div>
                ))}
                {(!selectedDay || !dayContent[selectedDay] || dayContent[selectedDay].length === 0) && (
                  <div className="text-center mt-32">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Загрузите фото, видео, музыку или документы</p>
                    <p className="text-sm text-muted-foreground mt-2">Перетаскивайте файлы мышкой для их расположения</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="notebook" className="mt-4">
              <div 
                className="min-h-[500px] bg-white p-8 rounded-lg border-2 border-blue-200 relative overflow-hidden" 
                style={{ backgroundImage: 'repeating-linear-gradient(white 0px, white 24px, #e3f2fd 24px, #e3f2fd 26px)' }}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {selectedDay && dayContent[selectedDay]?.map((file) => (
                  <div
                    key={file.id}
                    className="draggable-item"
                    style={{ left: file.x, top: file.y }}
                    onMouseDown={(e) => handleDragStart(e, file.id, file.x, file.y)}
                  >
                    {file.type === 'image' && (
                      <img src={file.url} alt={file.name} className="w-32 h-32 object-cover shadow-lg rounded" />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="kawaii" className="mt-4">
              <div 
                className="min-h-[500px] bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-lg border-4 border-pink-300 relative overflow-hidden"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {selectedDay && dayContent[selectedDay]?.map((file) => (
                  <div
                    key={file.id}
                    className="draggable-item"
                    style={{ left: file.x, top: file.y }}
                    onMouseDown={(e) => handleDragStart(e, file.id, file.x, file.y)}
                  >
                    {file.type === 'image' && (
                      <img src={file.url} alt={file.name} className="w-32 h-32 object-cover shadow-lg rounded-lg border-4 border-pink-200" />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="planner" className="mt-4">
              <div 
                className="min-h-[500px] bg-white p-8 rounded-lg border border-gray-300 overflow-hidden relative"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {selectedDay && dayContent[selectedDay]?.map((file) => (
                  <div
                    key={file.id}
                    className="draggable-item"
                    style={{ left: file.x, top: file.y }}
                    onMouseDown={(e) => handleDragStart(e, file.id, file.x, file.y)}
                  >
                    {file.type === 'image' && (
                      <img src={file.url} alt={file.name} className="w-32 h-32 object-cover shadow-lg" />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blank" className="mt-4">
              <div 
                className="min-h-[500px] bg-white p-8 rounded-lg overflow-hidden relative"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {selectedDay && dayContent[selectedDay]?.map((file) => (
                  <div
                    key={file.id}
                    className="draggable-item"
                    style={{ left: file.x, top: file.y }}
                    onMouseDown={(e) => handleDragStart(e, file.id, file.x, file.y)}
                  >
                    {file.type === 'image' && (
                      <img src={file.url} alt={file.name} className="w-32 h-32 object-cover shadow-lg rounded" />
                    )}
                  </div>
                ))}
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
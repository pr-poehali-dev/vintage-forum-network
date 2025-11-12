import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Settings = () => {
  const [name, setName] = useState('Александр');
  const [username, setUsername] = useState('sasha_vintage');
  const [email, setEmail] = useState('alex@example.com');
  const [birthDate, setBirthDate] = useState('1995-03-15');
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState('russia');
  const [deletePassword, setDeletePassword] = useState('');
  
  const [privacyProfile, setPrivacyProfile] = useState(false);
  const [privacyMessages, setPrivacyMessages] = useState('all');

  const handleSaveProfile = () => {
    console.log('Saving profile:', { name, username, email, birthDate, gender, country });
  };

  const handleChangePassword = () => {
    console.log('Changing password');
  };

  const handleDeleteAccount = () => {
    if (deletePassword) {
      console.log('Deleting account with password:', deletePassword);
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

      <div className="max-w-4xl mx-auto pt-20">
        <Card className="p-8 polaroid-shadow">
          <h1 className="text-3xl font-bold mb-6">Настройки</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="privacy">Приватность</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Псевдоним</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Дата рождения</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Пол</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Мужской</SelectItem>
                        <SelectItem value="female">Женский</SelectItem>
                        <SelectItem value="other">Другой</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Страна</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger id="country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="russia">Россия</SelectItem>
                      <SelectItem value="ukraine">Украина</SelectItem>
                      <SelectItem value="belarus">Беларусь</SelectItem>
                      <SelectItem value="other">Другая</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveProfile} className="w-full">
                  Сохранить изменения
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Скрыть страницу</Label>
                    <p className="text-sm text-muted-foreground">
                      Профиль будет виден только вам
                    </p>
                  </div>
                  <Switch
                    checked={privacyProfile}
                    onCheckedChange={setPrivacyProfile}
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-4">
                  <Label>Кто может писать сообщения</Label>
                  <Select value={privacyMessages} onValueChange={setPrivacyMessages}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все пользователи</SelectItem>
                      <SelectItem value="friends">Только друзья</SelectItem>
                      <SelectItem value="none">Никто</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              <Button className="w-full">
                Сохранить настройки приватности
              </Button>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Изменить пароль</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ссылка для смены пароля будет отправлена на ваш email
                </p>
                <Button onClick={handleChangePassword} variant="outline" className="w-full">
                  Отправить ссылку
                </Button>
              </Card>

              <Card className="p-4 border-destructive">
                <h3 className="font-semibold mb-2 text-destructive">Опасная зона</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Удаление профиля необратимо
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Icon name="Trash2" className="mr-2" size={18} />
                      Удалить профиль
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Удалить профиль</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        Это действие нельзя отменить. Введите ваш пароль для подтверждения.
                      </p>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                      />
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleDeleteAccount}
                      >
                        Подтвердить удаление
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

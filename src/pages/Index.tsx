import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Ваза Сакура', price: 3500, image: 'https://cdn.poehali.dev/projects/630ee58c-6444-4412-bf6d-c9dc1a2d852a/files/7c2b3a9c-376f-47e0-b7f7-31179d56266e.jpg', category: 'Вазы' },
    { id: 2, name: 'Набор пиал', price: 4200, image: 'https://cdn.poehali.dev/projects/630ee58c-6444-4412-bf6d-c9dc1a2d852a/files/b1ddddf5-7d75-4b47-9dd5-8e53ea957074.jpg', category: 'Посуда' },
    { id: 3, name: 'Чайный сервиз', price: 8900, image: 'https://cdn.poehali.dev/projects/630ee58c-6444-4412-bf6d-c9dc1a2d852a/files/6b7c102a-2e87-4049-a801-225b0f1f36f8.jpg', category: 'Сервизы' },
    { id: 4, name: 'Пиала Момидзи', price: 1800, image: 'https://cdn.poehali.dev/projects/630ee58c-6444-4412-bf6d-c9dc1a2d852a/files/7c2b3a9c-376f-47e0-b7f7-31179d56266e.jpg', category: 'Посуда' },
    { id: 5, name: 'Чаша для чая', price: 2400, image: 'https://cdn.poehali.dev/projects/630ee58c-6444-4412-bf6d-c9dc1a2d852a/files/b1ddddf5-7d75-4b47-9dd5-8e53ea957074.jpg', category: 'Посуда' },
    { id: 6, name: 'Декоративная тарелка', price: 3200, image: 'https://cdn.poehali.dev/projects/630ee58c-6444-4412-bf6d-c9dc1a2d852a/files/6b7c102a-2e87-4049-a801-225b0f1f36f8.jpg', category: 'Декор' },
  ];

  const reviews = [
    { name: 'Анна', text: 'Прекрасная работа! Керамика нежная и качественная', rating: 5 },
    { name: 'Мария', text: 'Очень довольна покупкой. Сервиз как с картинки', rating: 5 },
    { name: 'Елена', text: 'Упаковано отлично, доставка быстрая', rating: 5 },
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Сакура Керамика 🌸</h1>
          <div className="flex gap-6 items-center">
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="hover:text-primary transition-colors">О нас</a>
            <a href="#delivery" className="hover:text-primary transition-colors">Доставка</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <div className="fixed right-0 top-16 w-96 h-[calc(100vh-4rem)] bg-white shadow-2xl z-40 p-6 overflow-y-auto animate-fade-in border-l border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Корзина</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                        <p className="font-bold text-primary">{item.price * item.quantity} ₽</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">{getTotalPrice()} ₽</span>
                </div>
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Керамика ручной работы
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Изделия из глины в стиле японской эстетики
          </p>
          <Button size="lg" className="animate-scale-in">
            Смотреть каталог
          </Button>
          <div className="mt-12 text-6xl animate-float">🌸</div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Каталог изделий</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">{product.category}</Badge>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">О мастерской</h2>
          <div className="text-lg text-muted-foreground space-y-4 text-center">
            <p>
              Мы создаем керамические изделия вручную, вдохновляясь красотой японской природы 
              и философией ваби-саби — красоты в несовершенстве.
            </p>
            <p>
              Каждое изделие уникально и несет в себе частичку души мастера. 
              Мы используем только качественную глину и экологичные глазури.
            </p>
            <p className="text-2xl">🎨 ✨ 🏺</p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">По России</h3>
                <p className="text-muted-foreground">СДЭК, Почта России<br/>от 3 дней</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Самовывоз</h3>
                <p className="text-muted-foreground">Москва<br/>бесплатно</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Package" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Упаковка</h3>
                <p className="text-muted-foreground">Надежная упаковка<br/>в подарочную коробку</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">sakura@ceramics.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="Instagram" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">Instagram</p>
                    <p className="text-muted-foreground">@sakura_ceramics</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Textarea placeholder="Сообщение" rows={4} />
                  <Button className="w-full">
                    Отправить
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t bg-secondary/20">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Сакура Керамика. Все права защищены.</p>
          <p className="mt-2">Создано с любовью 🌸</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

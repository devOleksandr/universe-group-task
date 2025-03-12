# PDF Generator App

Тестове завдання - https://github.com/ivz-dev/Frontend-Test-Task

PDF Generator App — це веб-додаток, побудований на Next.js, який дозволяє користувачам створювати PDF-документи з введеного тексту, включаючи підтримку кирилиці, переглядати згенеровані PDF у реальному часі, зберігати історію документів у `localStorage` та переглядати її на окремій сторінці.

## Зміни функціоналу якій не відповідає ТЗ:
- **Заміна апі для обробки PDF**: Оскільки апі http://95.217.134.12:4010/create-pdf?apiKey={YOUR_API_KEY} не працює, то генерацію документа вирішив робити за допомогою jsPDF.


## Основні функції
- **Генерація PDF**: Створення PDF-документів із введеного тексту з підтримкою кирилиці.
- **Попередній перегляд**: Відображення згенерованого PDF у браузері.
- **Історія**: Збереження всіх згенерованих PDF у `localStorage` із можливістю перегляду.
- **Інтерфейс**: Сучасний дизайн із використанням Tailwind CSS.
- **Маршрутизація**: Використання App Router у Next.js для навігації між головною сторінкою та історією.

## Технології
- **Next.js**: Фреймворк для React із підтримкою App Router.
- **React**: Клієнтська логіка та компоненти.
- **TypeScript**: Статична типізація.
- **Tailwind CSS**: Стилізація інтерфейсу.
- **jsPDF**: Генерація PDF-документів.
- **react-pdf**: Відображення PDF у браузері.
- **Jest & React Testing Library**: Юніт-тестування.

## Майбутні покращення
- Додати підтримку кирилиці.
- Реалізувати очищення історії.
- IndexedDB для великих обсягів даних.

## Структура проєкту
Використаний підхід модульної архітектури

- **`app/`**
    - `layout.tsx` — Загальний layout із навігацією між сторінками.
    - `page.tsx` — Головна сторінка для генерації PDF.
    - **`history/`**
        - `page.tsx` — Сторінка історії з відображенням збережених PDF.
- **`modules/`**
    - **`Converter/`** — Модуль для роботи з додаванням та відображенням PDF.
         - - **`components/`** — Модуль для роботи з додаванням та відображенням PDF.
             - `ConverterForm.tsx` — Компонент для введення тексту та кнопкою генерації.
             - `Preview.tsx` — Компонент для перегляду згенерованого PDF.
             - `PDFContext.tsx` — Контекст для управління станом і логікою.
        - **`utils/`**
            - `generatePDF.ts` — Функція генерації PDF.
            - `generatePDF.test.tsx` — Тести для PDFContext.
  - **`History/`** — Модуль для роботи історією.
      - - **`components/`** — Модуль для роботи з додаванням та відображенням PDF.
          - `Hitsory.tsx` — Компонент для відображення історії.
### Вимоги
- Node.js (версія 18 або вище)
- npm (або yarn/pnpm)

### Кроки
1. Склонувати репозиторій:
   ```bash
   git clone <repository-url>
   cd pdf-generator-app

2. Встановити залежності:
   ```bash
   npm install
   
3. Запустити додаток у режимі розробки:
   ```bash
   npm run dev

   
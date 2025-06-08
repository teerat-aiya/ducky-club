import React, { useState, useEffect } from 'react';

interface CardItemProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  pictureUrl?: string;
  actionLabel?: string;
  actionUrl?: string;
}

interface CardMessageProps {
  card: {
    contents: CardItemProps[];
  };
  onChanged: (updatedCard: { contents: CardItemProps[] }) => void;
}

const MAX_CARD = 10;

export const CardMessage: React.FC<CardMessageProps> = ({ card, onChanged }) => {
  const [activeCard, setActiveCard] = useState<string>('');
  const [cards, setCards] = useState<CardItemProps[]>(card.contents || []);

  useEffect(() => {
    if (card.contents.length === 0) {
      addCard();
    } else {
      setCards(card.contents);
      setActiveCard(card.contents[0]?.id || '');
    }
  }, [card.contents]);

  const addCard = () => {
    if (cards.length < MAX_CARD) {
      const newCard: CardItemProps = {
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        image: '',
        subtitle: '',
      };
      const newList = [...cards, newCard];
      setCards(newList);
      setActiveCard(newCard.id);
      onChanged({ contents: newList });
    }
  };

  const removeCard = (cardId: string) => {
    if (cards.length === 1) return;
    const newList = cards.filter((x) => x.id !== cardId);
    setCards(newList);
    setActiveCard(newList[0]?.id || '');
    onChanged({ contents: newList });
  };

  const onCardChanged = (cardId: string, data: Partial<CardItemProps>) => {
    const newList = cards.map(card =>
      card.id === cardId ? { ...card, ...data } : card
    );
    setCards(newList);
    onChanged({ contents: newList });
  };

  return (
      <div className="space-y-4">
        {cards.length < MAX_CARD && (
          <div className="flex justify-end">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={addCard}
            >
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Card
            </button>
          </div>
        )}

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {cards.map((card, index) => (
                        <th
                          key={card.id}
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Card {index + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      {cards.map((card) => (
                        <td
                          key={card.id}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                        >
                          <button
                            type="button"
                            className={`py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium ${activeCard === card.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                              }`}
                            onClick={() => setActiveCard(card.id)}
                          >
                            Edit
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {activeCard && (
          <CardEditor
            card={cards.find(c => c.id === activeCard)!}
            onCardChanged={(data) => onCardChanged(activeCard, data)}
            onRemove={() => removeCard(activeCard)}
          />
        )}
      </div>
  );
};

interface CardEditorProps {
  card: CardItemProps;
  onCardChanged: (data: Partial<CardItemProps>) => void;
  onRemove: () => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ card, onCardChanged, onRemove }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert(`${file.name} file size is over limit: 1MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          onCardChanged({ image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 md:p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6 sm:items-start">
          <div className="flex-shrink-0 relative w-full sm:w-auto sm:max-w-[12rem]">
            <img
              className="w-full h-auto rounded-lg"
              src={card.image || card.pictureUrl || 'https://via.placeholder.com/300x200'}
              alt="Card preview"
            />
            <div className="mt-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              File size limit: 1MB<br />
              Format jpg, png with ratio 1:1 recommend 1040x1040
            </p>
          </div>

          <div className="flex-grow">
            <div className="space-y-4">
              <div>
                <label htmlFor="card-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                  type="text"
                  id="card-title"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  value={card.title}
                  onChange={(e) => onCardChanged({ title: e.target.value })}
                  maxLength={80}
                  placeholder="Enter card title"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Max. 80 characters</p>
              </div>

              <div>
                <label htmlFor="card-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="card-description"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  rows={3}
                  value={card.subtitle}
                  onChange={(e) => onCardChanged({ subtitle: e.target.value })}
                  maxLength={80}
                  placeholder="Enter card description"
                ></textarea>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Max. 80 characters</p>
              </div>

              <div>
                <label htmlFor="button-label" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Button Label</label>
                <input
                  type="text"
                  id="button-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  value={card.actionLabel}
                  onChange={(e) => onCardChanged({ actionLabel: e.target.value })}
                  maxLength={20}
                  placeholder="Enter button label"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Max. 20 characters</p>
              </div>

              <div>
                <label htmlFor="action-url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action URL</label>
                <input
                  type="text"
                  id="action-url"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  value={card.actionUrl}
                  onChange={(e) => onCardChanged({ actionUrl: e.target.value })}
                  maxLength={255}
                  placeholder="Enter action URL"
                />
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={onRemove}
                >
                  Remove this card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

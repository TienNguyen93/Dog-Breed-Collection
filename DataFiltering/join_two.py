
import pandas as pd


dog_breed = pd.read_csv('dog breeds_enriched_20210503.csv')
dog_intelligence = pd.read_csv('dog_intelligence.csv')

all = pd.merge(dog_breed, dog_intelligence, how = 'left',on = 'Breed')
all1 = all[['Breed','Breed Group AKC','average height','average weight','average lifespan','Classification','obey']]
#print(all.head())
#print(all1)
all1.to_csv('DogInfos.csv', index = False)
"""
inches
lbs
"""
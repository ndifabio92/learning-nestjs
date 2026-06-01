import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v7 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((x) => x.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(body: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...body,
    };

    this.cars.push(car);
    return car;
  }

  update(id: string, body: UpdateCarDto) {
    let carDB = this.cars.find((x) => x.id === id);

    if (!carDB) throw new NotFoundException(`Car with id ${id} not found`);

    if (body.id && body.id !== id) {
      throw new BadRequestException(`Car id not valid`);
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...car,
          ...body,
          id,
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.cars.find((x) => x.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    this.cars = this.cars.filter((x) => x.id !== id);

    return true;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
